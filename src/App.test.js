import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  console.log(screen.debug())
  const linkElement = screen.getByText(/ADMIN PAGE/);
  expect(linkElement).toBeInTheDocument();
});
