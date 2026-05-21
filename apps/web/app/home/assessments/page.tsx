import Link from 'next/link';

import { PlusCircle } from 'lucide-react';

import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';
import { Button } from '@kit/ui/button';
import { PageBody, PageHeader } from '@kit/ui/page';

async function getAssessments() {
  const client = getSupabaseServerAdminClient();
  const { data } = await client
    .from('assessments')
    .select('id, title, level, time_limit, status, created_at, domains(name)')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function AssessmentsPage() {
  const assessments = await getAssessments();

  return (
    <>
      <PageHeader
        title={'Assessments'}
        description={'Create and manage your hiring assessments'}
      >
        <Button asChild>
          <Link href={'/home/assessments/new'}>
            <PlusCircle className={'mr-2 h-4 w-4'} />
            New Assessment
          </Link>
        </Button>
      </PageHeader>

      <PageBody>
        {assessments.length === 0 ? (
          <div className={'rounded-lg border border-dashed p-12 text-center'}>
            <h3 className={'text-lg font-medium'}>No assessments yet</h3>
            <p className={'text-muted-foreground mt-2 text-sm'}>
              Create your first assessment to start screening candidates.
            </p>
            <Button className={'mt-4'} asChild>
              <Link href={'/home/assessments/new'}>
                <PlusCircle className={'mr-2 h-4 w-4'} />
                Create Assessment
              </Link>
            </Button>
          </div>
        ) : (
          <div className={'flex flex-col space-y-3'}>
            {assessments.map((assessment) => (
              <div
                key={assessment.id}
                className={
                  'flex items-center justify-between rounded-lg border p-4'
                }
              >
                <div>
                  <h3 className={'font-medium'}>{assessment.title}</h3>
                  <p className={'text-muted-foreground mt-1 text-sm'}>
                    {(assessment.domains as { name: string } | null)?.name} ·{' '}
                    {assessment.level?.toUpperCase()} · {assessment.time_limit}{' '}
                    mins
                  </p>
                </div>
                <div className={'flex items-center gap-3'}>
                  <span
                    className={'bg-secondary rounded-full px-2 py-1 text-xs'}
                  >
                    {assessment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </PageBody>
    </>
  );
}
