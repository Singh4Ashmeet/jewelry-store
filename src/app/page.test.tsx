import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home page', () => {
  it('renders the virtual try-on commerce story', () => {
    render(<Home />);

    expect(screen.getByRole('heading', { name: /try the glow before it arrives/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start virtual try-on/i })).toBeInTheDocument();
    expect(screen.getByText(/shop by category/i)).toBeInTheDocument();
    expect(screen.getByText(/trending now/i)).toBeInTheDocument();
    expect(screen.getAllByText(/private by design/i).length).toBeGreaterThan(0);
  });
});
