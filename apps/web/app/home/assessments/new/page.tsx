'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@kit/ui/button';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { PageBody, PageHeader } from '@kit/ui/page';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';

import { createAssessment } from '../actions';

export default function NewAssessmentPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('');
  const [level, setLevel] = useState('');
  const [timeLimit, setTimeLimit] = useState('60');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createAssessment({
        title,
        domain_slug: domain,
        level,
        time_limit: parseInt(timeLimit),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title={'New Assessment'}
        description={'Create a new hiring assessment'}
      />
      <PageBody>
        <div className={'max-w-2xl'}>
          <form onSubmit={handleSubmit} className={'flex flex-col space-y-6'}>
            {error && (
              <div className={'rounded-md bg-red-50 p-4 text-sm text-red-600'}>
                {error}
              </div>
            )}
            <div className={'flex flex-col space-y-2'}>
              <Label htmlFor={'title'}>Assessment Title</Label>
              <Input
                id={'title'}
                placeholder={'e.g. English Comprehension - Level 1'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className={'flex flex-col space-y-2'}>
              <Label>Domain</Label>
              <Select value={domain} onValueChange={setDomain}>
                <SelectTrigger>
                  <SelectValue placeholder={'Select a domain'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={'english'}>English</SelectItem>
                  <SelectItem value={'reasoning'}>Reasoning</SelectItem>
                  <SelectItem value={'mathematics'}>Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className={'flex flex-col space-y-2'}>
              <Label>Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue placeholder={'Select a level'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={'l1'}>L1 — Entry Level</SelectItem>
                  <SelectItem value={'l2'}>L2 — Mid Level</SelectItem>
                  <SelectItem value={'l3'}>L3 — Senior Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className={'flex flex-col space-y-2'}>
              <Label htmlFor={'timeLimit'}>Time Limit (minutes)</Label>
              <Input
                id={'timeLimit'}
                type={'number'}
                min={'10'}
                max={'180'}
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                required
              />
            </div>
            <div className={'flex space-x-4'}>
              <Button type={'submit'} disabled={loading}>
                {loading ? 'Creating...' : 'Create Assessment'}
              </Button>
              <Button
                type={'button'}
                variant={'outline'}
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </PageBody>
    </>
  );
}
