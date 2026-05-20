import { PlusCircle } from 'lucide-react';

import { Button } from '@kit/ui/button';
import { PageBody, PageHeader } from '@kit/ui/page';

export default function AssessmentsPage() {
  return (
    <>
      <PageHeader
        title={'Assessments'}
        description={'Create and manage your hiring assessments'}
      >
        <Button>
          <PlusCircle className={'mr-2 h-4 w-4'} />
          New Assessment
        </Button>
      </PageHeader>

      <PageBody>
        <div className={'flex flex-col space-y-4'}>
          <div className={'rounded-lg border border-dashed p-12 text-center'}>
            <h3 className={'text-lg font-medium'}>No assessments yet</h3>
            <p className={'text-muted-foreground mt-2 text-sm'}>
              Create your first assessment to start screening candidates.
            </p>
            <Button className={'mt-4'}>
              <PlusCircle className={'mr-2 h-4 w-4'} />
              Create Assessment
            </Button>
          </div>
        </div>
      </PageBody>
    </>
  );
}
