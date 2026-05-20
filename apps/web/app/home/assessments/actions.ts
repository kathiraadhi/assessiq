'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { requireUser } from '@kit/supabase/require-user';

export async function createAssessment(formData: {
  title: string;
  domain_slug: string;
  level: string;
  time_limit: number;
}) {
  // Get the authenticated user's ID for account_id
  const authClient = getSupabaseServerClient();
  const result = await requireUser(authClient);

  if (result.error) {
    throw new Error('Authentication required');
  }

  const userId = result.data.id as string;

  // Use the admin client to bypass RLS
  const adminClient = getSupabaseServerAdminClient();

  // DEBUG: log env vars to server terminal (remove after fix)
  console.log('[DEBUG] SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30));
  console.log('[DEBUG] SERVICE_ROLE_KEY present:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  console.log('[DEBUG] SERVICE_ROLE_KEY prefix:', process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20));

  // Get domain id from slug
  const { data: domain, error: domainError } = await adminClient
    .from('domains')
    .select('id')
    .eq('slug', formData.domain_slug)
    .single();

  if (domainError || !domain) {
    throw new Error(`Domain not found: ${domainError?.message}`);
  }

  // Create assessment
  const { error } = await adminClient.from('assessments').insert({
    title: formData.title,
    domain_id: domain.id,
    level: formData.level,
    time_limit: formData.time_limit,
    account_id: userId,
    status: 'draft',
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/home/assessments');
  redirect('/home/assessments');
}
