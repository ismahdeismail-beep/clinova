import '@testing-library/jest-dom/vitest'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CardSkeleton, ListSkeleton, Skeleton } from '../Skeleton'

describe('Skeleton', () => {
  it('renders a pulse block with the given dimensions', () => {
    const { container } = render(<Skeleton width="2rem" height="3rem" />)
    const block = container.firstChild as HTMLElement
    expect(block).toHaveClass('animate-pulse')
    expect(block.style.width).toBe('2rem')
    expect(block.style.height).toBe('3rem')
  })

  it('renders five pulse blocks in CardSkeleton', () => {
    const { container } = render(<CardSkeleton />)
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(5)
  })

  it('renders three pulse blocks per row in ListSkeleton', () => {
    const { container } = render(<ListSkeleton count={3} />)
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(9)
  })
})
