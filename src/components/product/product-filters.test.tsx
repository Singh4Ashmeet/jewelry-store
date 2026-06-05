import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductFilters } from '@/components/product/product-filters';

const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/rings',
  useSearchParams: () => new URLSearchParams('q=ring&utm=nav&page=2'),
}));

describe('ProductFilters', () => {
  beforeEach(() => {
    push.mockClear();
  });

  it('keeps edits local until Apply is clicked', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(<ProductFilters initialFilters={{ sort: 'popular' }} onChange={onChange} />);

    await user.click(screen.getByLabelText('Yellow Gold'));

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ metals: ['YELLOW_GOLD'] }));
    expect(push).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /apply filters/i })).toHaveClass('bg-[#B58E62]');

    await user.click(screen.getByRole('button', { name: /apply filters/i }));

    expect(push).toHaveBeenCalledWith('/rings?q=ring&utm=nav&page=1&metal=YELLOW_GOLD', { scroll: false });
  });

  it('clears filter params without wiping search params', async () => {
    const user = userEvent.setup();

    render(<ProductFilters initialFilters={{ metals: ['SILVER'], sort: 'popular' }} />);

    await user.click(screen.getByRole('button', { name: /clear/i }));

    expect(push).toHaveBeenCalledWith('/rings?q=ring&utm=nav', { scroll: false });
  });
});
