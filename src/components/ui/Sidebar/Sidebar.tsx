import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IconBrandGithub, IconBrandTwitter, IconGridDots, IconKey, IconLogout, IconSpeakerphone } from 'tabler-icons'

type NavItemProps = {
  href: string
  icon: React.ReactNode
  label: string
  external?: boolean
}
const NavItem = ({ href, icon, label, external }: NavItemProps) => {
  const Anchor = external ? 'a' : Link
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <li title={label} aria-label={label}>
      <Anchor
        href={href}
        className="flex group items-center p-2 -mx-2 text-sm font-semibold leading-6 text-neutral-400 rounded-md group gap-x-3 hover:bg-neutral-100 hover:pl-4 transition-all duration-200 ease-out"
        {...externalProps}
      >
        {icon}
        {label}
      </Anchor>
    </li>
  )
}

const Sidebar = () => {
  return (
    <div className="lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-white border-r border-r-neutral-200 shadow-sm z-10 grow gap-y-5">
        <div className="flex flex-col items-start my-4 rounded-xl" title="METORIK" aria-label="Metorik logo">
          <Image width={1660} height={896} className="w-40" src="/logo.png" alt="METORIK" />
        </div>
        <nav className="flex flex-col flex-1">
          <ul role="list" className="flex flex-col flex-1 gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1"></ul>
            </li>
            <li>
              <div className="text-xs font-semibold leading-6 text-neutral-400">Navigation</div>
              <ul role="list" className="mt-2 -mx-2 space-y-1 px-2">
                <NavItem
                  href="/a/dashboard"
                  icon={
                    <IconGridDots className="w-4 h-4 group-hover:-rotate-12 transition-all duration-300 ease-in-out" />
                  }
                  label="Dashboard"
                />
                <NavItem
                  href="/a/events"
                  icon={
                    <IconSpeakerphone className="w-4 h-4 group-hover:-rotate-12 transition-all duration-300 ease-in-out" />
                  }
                  label="Events"
                />
                <NavItem
                  href="/a/keys"
                  icon={
                    <IconKey className="w-4 h-4 group-hover:-rotate-12 transition-all duration-300 ease-in-out" />
                  }
                  label="Keys"
                />
              </ul>
            </li>
            <div className="flex-1 justify-end  w-full flex flex-col mt-auto gap-y-2">
              <NavItem
                external
                href="https://github.com/adevinwild"
                icon={
                  <IconBrandGithub className="w-4 h-4 group-hover:-rotate-12 transition-all duration-300 ease-in-out" />
                }
                label="GitHub"
              />
              <NavItem
                external
                href="https://twitter.com/adevinwild"
                icon={
                  <IconBrandTwitter className="w-4 h-4 group-hover:-rotate-12 transition-all duration-300 ease-in-out" />
                }
                label="Twitter"
              />
              <NavItem
                href="/logout"
                icon={
                  <IconLogout className="w-4 h-4 group-hover:-rotate-12 transition-all duration-300 ease-in-out" />
                }
                label="Exit"
              />
            </div>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
