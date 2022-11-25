import { format } from 'date-fns/fp'

export namespace DateFormatter {
  export const formatDateTime = format('dd MMM yyyy h:mm aa')
  export const formatDate = format('dd MMM yyyy')
}
