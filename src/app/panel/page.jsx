import { Button } from '@/components/button'
import { GradientBackground } from '@/components/gradient'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Keyboard } from '@/components/keyboard'
import { Link } from '@/components/link'
import { LinkedAvatars } from '@/components/linked-avatars'
import { LogoCloud } from '@/components/logo-cloud'
import { LogoCluster } from '@/components/logo-cluster'
import { LogoTimeline } from '@/components/logo-timeline'
import { Mark } from '@/components/logo'
import { Checkbox, Field, Input, Label } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/16/solid'
import { clsx } from 'clsx'
import { Heading, Lead, Subheading } from '@/components/text'
import { Navbar } from '@/components/navbar'
import Tabs from '@/components/tabs'
import VersionList from '@/components/version-list'

export default function Panel() {
  const stats = [
    { name: 'Active Projects', stat: '3' },
    { name: 'Suggestions Implemented', stat: '85%' },
    { name: 'Last Updated', stat: '7 days ago' },
  ];
  return (
    <main className="overflow-hidden bg-gray-50">
    <GradientBackground />
    <Container>
      <Navbar />
      <Subheading className="mt-16">Panel</Subheading>
      <Heading as="h1" className="mt-2">
        Research Control Hub
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Track progress, manage versions, and collaborate efficiently.
      </Lead>
      <div>
        
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
            </div>
          ))}
        </dl>
      </div>
      <Tabs/>
      <VersionList/>
    </Container>
    <div className="isolate flex justify-center p-6 ">
      
    </div>
  </main>
  )
}
