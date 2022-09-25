import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { navigation } from 'src/config/site'
import { classNames } from 'src/utils'

export const Header = () => {
  const router = useRouter()

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => {
          return (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex flex-shrink-0 flex-col items-center justify-center">
                      <Image
                        width={32}
                        height={32}
                        src="/assets/logo.svg"
                        alt="Logo"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => {
                          const current = router.pathname === item.pathName
                          return (
                            <a
                              key={item.name}
                              href={item.pathName}
                              className={classNames(
                                current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                              aria-current={current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <span className="sr-only">Open main menu</span>
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => {
                    const current = router.pathname === item.pathName
                    return (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.pathName}
                        className={classNames(
                          current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    )
                  })}
                </div>
              </Disclosure.Panel>
            </>
          )
        }}
      </Disclosure>
    </div>
  )
}
