import { NowState } from '@/types'

// Static "currently" focus, surfaced in the nav rail and the mobile hero pill.
// Sourced from the resume — Spring Street is the current employer + active migration work.
export const now: Pick<NowState, 'company' | 'focus' | 'detail' | 'status' | 'location'> = {
  company: 'Spring Street',
  focus: 'Goa HTTP → Connect-RPC (protobuf) migration',
  detail: 'broker-grade trading infra · WebSocket streaming · exactly-once outbox',
  status: 'online',
  location: 'Mumbai · IST',
}
