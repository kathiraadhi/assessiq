import Link from 'next/link';

import { ArrowRightIcon } from 'lucide-react';

import {
  CtaButton,
  FeatureCard,
  FeatureGrid,
  FeatureShowcase,
  FeatureShowcaseIconContainer,
  Hero,
  Pill,
} from '@kit/ui/marketing';
import { Trans } from '@kit/ui/trans';

import { withI18n } from '~/lib/i18n/with-i18n';

function Home() {
  return (
    <div className={'mt-4 flex flex-col space-y-24 py-14'}>
      <div className={'container mx-auto'}>
        <Hero
          pill={
            <Pill label={'New'}>
              <span>AI-powered assessments for ERP & technical consulting</span>
            </Pill>
          }
          title={
            <>
              <span>Hire better SAP, Salesforce</span>
              <span>& ServiceNow talent</span>
            </>
          }
          subtitle={
            <span>
              AssessIQ generates domain-specific technical assessments in 30
              seconds. Built for consulting firms and IT staffing companies.
              Ready in 30 minutes. Priced for teams that aren't Fortune 500.
            </span>
          }
          cta={<MainCallToActionButton />}
        />
      </div>

      <div className={'container mx-auto'}>
        <div
          className={'flex flex-col space-y-16 xl:space-y-32 2xl:space-y-36'}
        >
          <FeatureShowcase
            heading={
              <>
                <b className="font-semibold dark:text-white">
                  Domain-specific hiring assessment.
                </b>{' '}
                <span className="text-muted-foreground font-normal">
                  Stop using Google Forms. Start screening candidates the right
                  way.
                </span>
              </>
            }
            icon={
              <FeatureShowcaseIconContainer>
                <span>Everything you need</span>
              </FeatureShowcaseIconContainer>
            }
          >
            <FeatureGrid>
              <FeatureCard
                className={'relative col-span-2 overflow-hidden'}
                label={'AI-Generated Assessments'}
                description={`Enter a role and experience level — get a complete 20-question assessment in 30 seconds. SAP, Salesforce, ServiceNow and more.`}
              />

              <FeatureCard
                className={
                  'relative col-span-2 w-full overflow-hidden lg:col-span-1'
                }
                label={'AI Answer Evaluation'}
                description={`Free-text answers are evaluated by AI instantly. Every score includes reasoning so recruiters understand why.`}
              />

              <FeatureCard
                className={'relative col-span-2 overflow-hidden lg:col-span-1'}
                label={'Ready in 30 Minutes'}
                description={`Sign up, pick a domain, send your first assessment — all in under 30 minutes. No implementation consultant needed.`}
              />

              <FeatureCard
                className={'relative col-span-2 overflow-hidden'}
                label={'Priced for SMBs'}
                description={`Starting at ₹4,999/month. No enterprise contracts, no minimum commitments, no hidden fees.`}
              />
            </FeatureGrid>
          </FeatureShowcase>
        </div>
      </div>
    </div>
  );
}

export default withI18n(Home);

function MainCallToActionButton() {
  return (
    <div className={'flex space-x-4'}>
      <CtaButton>
        <Link href={'/auth/sign-up'}>
          <span className={'flex items-center space-x-0.5'}>
            <span>
              <Trans i18nKey={'common:getStarted'} />
            </span>
            <ArrowRightIcon className={'h-4'} />
          </span>
        </Link>
      </CtaButton>

      <CtaButton variant={'link'}>
        <Link href={'/contact'}>
          <Trans i18nKey={'common:contactUs'} />
        </Link>
      </CtaButton>
    </div>
  );
}
