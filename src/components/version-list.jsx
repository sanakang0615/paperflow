import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

const projects = [
  {
    number: 'HCI0231',
    href: '#',
    invoiceHref: '#',
    createdDate: 'Oct 22, 2024',
    status: 'Done',
    lastSeenDate: 'Nov 24, 2024',
    products: [
      {
        id: 1,
        branch: 'Main branch',
        name: 'Paper Weaver V1',
        description:"With the rapid growth of scholarly archives, researchers subscribe to “paper alert” systems that periodically provide them with recom- mendations of recently published papers that are similar to previ-",
        href: '#',
        price: 'Seen',
        imageSrc: '/asset/paperweaver_1.png',
        imageAlt:
          'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
      },
      // More products...
    ],
  },
  {
    number: 'HCI0232',
    href: '#',
    invoiceHref: '#',
    createdDate: 'Oct 25, 2024',
    status: 'Seen',
    lastSeenDate: 'Nov 28, 2024',
    products: [
      {
        id: 1,
        branch: 'Main branch',
        name: 'Paper Weaver V2',
        description:"With the rapid growth of scholarly archives, researchers subscribe to “paper alert” systems that periodically provide them with recom- mendations of recently published papers that are similar to previ-",
        href: '#',
        price: 'Seen',
        imageSrc: '/asset/paperweaver_2.png',
        imageAlt:
          'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
      },
      // More products...
    ],
  },
  {
    number: 'HCI0233',
    href: '#',
    invoiceHref: '#',
    createdDate: 'Dec 14, 2024',
    status: 'Unseen',
    lastSeenDate: 'Dec 14, 2024',
    products: [
      {
        id: 1,
        branch: 'Branch-HCI0231-v1',
        name: 'Paper Weaver V3',
        description:
          "With the rapid growth of scholarly archives, researchers subscribe to “paper alert” systems that periodically provide them with recom- mendations of recently published papers that are similar to previ-",
        href: '#',
        price: 'Unseen',
        imageSrc: '/asset/paperweaver_3.png',
        imageAlt:
          'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
      },
      // More products...
    ],
  },
]

export default function VersionList() {
  return (
    <div className="bg-white">
      
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-2 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">📁 Project history</h1>
            <p className="mt-2 text-sm text-gray-500">
              Select a project version to view its graphs and feedback.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {projects.map((project) => (
                <div
                  key={project.number}
                  className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                >
                  <h3 className="sr-only">
                    Order placed on <time dateTime={project.createdDatetime}>{project.createdDate}</time>
                  </h3>

                  <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                    <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                      <div>
                        <dt className="font-medium text-gray-900">Project ID</dt>
                        <dd className="mt-1 text-gray-500">{project.number}</dd>
                      </div>
                      <div className="hidden sm:block">
                        <dt className="font-medium text-gray-900">Date created</dt>
                        <dd className="mt-1 text-gray-500">
                          <time dateTime={project.createdDatetime}>{project.createdDate}</time>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Lastly seen</dt>
                        <dd className="mt-1 font-medium text-gray-900">{project.lastSeenDate}</dd>
                      </div>
                    </dl>

                    <Menu as="div" className="relative flex justify-end lg:hidden">
                      <div className="flex items-center">
                        <MenuButton className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Options for project {project.number}</span>
                          <EllipsisVerticalIcon aria-hidden="true" className="h-6 w-6" />
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <a
                              href={project.href}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              View
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a
                              href={project.invoiceHref}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Invoice
                            </a>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>

                    <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                      <a
                        href={project.href}
                        className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span>Download PDF</span>
                        <span className="sr-only">{project.number}</span>
                      </a>
                      <a
                        href={project.invoiceHref}
                        className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span>Export Graph</span>
                        <span className="sr-only">for order {project.number}</span>
                      </a>
                    </div>
                  </div>

                  {/* Products */}
                  <h4 className="sr-only">Items</h4>
                  <ul role="list" className="divide-y divide-gray-200">
                    {project.products.map((product) => (
                      <li key={product.id} className="p-4 sm:p-6">
                        <div className="flex items-center sm:items-start">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                            <img
                              alt={product.imageAlt}
                              src={product.imageSrc}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-6 flex-1 text-sm">
                            <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                              <h5>{product.name}</h5>
                              <p className="mt-2 sm:mt-0">{product.price}</p>
                            </div>
                            <p className="hidden text-gray-500 sm:mt-2 sm:block">{product.description}</p>
                          </div>
                        </div>

                        <div className="mt-6 sm:flex sm:justify-between">
                          <div className="flex items-center">
                            <CheckCircleIcon aria-hidden="true" className="h-5 w-5 text-green-500" />
                            <p className="ml-2 text-sm font-medium text-gray-500">
                              {product.branch}
                            </p>
                          </div>

                          <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                            <div className="flex flex-1 justify-center">
                              <a
                                href={product.href}
                                className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                              >
                                View Graph
                              </a>
                            </div>
                            <div className="flex flex-1 justify-center pl-4">
                              <a href="#" className="whitespace-nowrap text-indigo-600 hover:text-indigo-500">
                                Create branch
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
