import { parseISO, format } from 'date-fns'
import { Text, TextProps } from '@chakra-ui/react'

export interface DateProps extends TextProps {
  dateString: string
}

export const Date = ({ dateString, ...props }: DateProps) => {
  const date = parseISO(dateString)
  return <Text as='time' dateTime={dateString} {...props}>{format(date, 'LLLL	d, yyyy')}</Text>
}

