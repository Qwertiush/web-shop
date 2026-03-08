import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('renders with correct text', () => {
    render(<Button title="Click me" onClick={()=>{}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});