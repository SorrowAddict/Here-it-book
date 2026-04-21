import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { http, HttpResponse } from 'msw'
import { HealthBadge } from '@/components/HealthBadge'

const meta = {
  title: 'Components/HealthBadge',
  component: HealthBadge,
} satisfies Meta<typeof HealthBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Healthy: Story = {}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/health', () => {
          return new HttpResponse(null, { status: 500 })
        }),
      ],
    },
  },
}
