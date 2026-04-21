import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { delay, http, HttpResponse } from 'msw'
import { BookSearchView } from '@/components/book/BookSearchView'

const meta = {
  title: 'Book/BookSearchView',
  component: BookSearchView,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BookSearchView>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Success: Story = {
  args: {
    initialQuery: '해리',
    autoSearch: true,
  },
}

export const Empty: Story = {
  args: {
    initialQuery: '없는책',
    autoSearch: true,
  },
}

export const Error: Story = {
  args: {
    initialQuery: '해리',
    autoSearch: true,
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/api/v1/book/search', () => {
          return HttpResponse.json({ message: 'server error' }, { status: 500 })
        }),
      ],
    },
  },
}

export const Loading: Story = {
  args: {
    initialQuery: '해리',
    autoSearch: true,
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/api/v1/book/search', async () => {
          await delay('infinite')
          return HttpResponse.json({})
        }),
      ],
    },
  },
}
