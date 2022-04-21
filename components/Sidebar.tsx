import { createContext, ReactChild, useMemo } from 'react'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'

export interface SidebarContextValue {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const SidebarContext = createContext<SidebarContextValue>({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
})

export interface SidebarProps {
  children: ((value: SidebarContextValue) => (ReactChild|ReactChild[]))
  content: ReactChild|ReactChild[]
  disable?: boolean
}

export function Sidebar ({ children, content, disable }: SidebarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const value = useMemo(() => ({
    isOpen, onOpen, onClose,
  }), [isOpen, onOpen, onClose])

  const childEl = (typeof children) === 'function' ? children(value) : children

  if (disable) return <>{childEl}</>

  return (
    <SidebarContext.Provider value={value}>
      {childEl}
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          {content}
        </DrawerContent>
      </Drawer>
    </SidebarContext.Provider >
  )
}