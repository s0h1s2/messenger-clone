import { IconType } from "react-icons"

export interface ItemProps {
  label: string,
  icon: IconType,
  href: string,
  onClick?: () => void
  active?: boolean
}
