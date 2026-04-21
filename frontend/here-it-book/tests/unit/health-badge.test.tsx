import { render, screen } from '@testing-library/react'
import { HealthBadge } from '@/components/HealthBadge'

describe('HealthBadge', () => {
  it('shows API healthy when the health endpoint is mocked as ok', async () => {
    render(<HealthBadge />)

    expect(await screen.findByText('API healthy')).toBeDefined()
  })
})
