'use client';

import { render, screen } from '@testing-library/react';
import { PasswordRequirements } from '../PasswordRequirements';

describe('PasswordRequirements', () => {
  // Test initial state with empty password
  test('displays all requirements as unmet when password is empty', () => {
    render(<PasswordRequirements passwordValue="" />);
    
    // Check that all requirement items are present
    const requirementItems = screen.getAllByText(/Mínimo 8 caracteres|Uma letra maiúscula|Uma letra minúscula|Um número|Um símbolo/);
    expect(requirementItems).toHaveLength(5);
    
    // Check that all show the empty state (○ symbol and gray background)
    requirementItems.forEach((label) => {
      const item = label.closest('div');
      if (!item) throw new Error('Could not find parent div');
      
      const circle = item.querySelector('span.w-4.h-4');
      expect(circle).toHaveTextContent('○');
      expect(circle).toHaveClass('bg-gray-100');
      
      expect(label).not.toHaveClass('line-through');
    });
  });

  // Test with valid password
  test('shows all requirements as met when password is valid', () => {
    const validPassword = 'Abcdefg1!';
    render(<PasswordRequirements passwordValue={validPassword} />);
    
    const requirementLabels = screen.getAllByText(/Mínimo 8 caracteres|Uma letra maiúscula|Uma letra minúscula|Um número|Um símbolo/);
    expect(requirementLabels).toHaveLength(5);
    
    // Check that all show the valid state (✓ symbol and green background)
    requirementLabels.forEach((label) => {
      const item = label.closest('div');
      if (!item) throw new Error('Could not find parent div');
      
      const circle = item.querySelector('span.w-4.h-4');
      expect(circle).toHaveTextContent('✓');
      expect(circle).toHaveClass('bg-[#10B981]');
      expect(circle).toHaveClass('text-white');
      
      expect(label).toHaveClass('line-through');
    });
  });

  // Test each requirement individually
  test.each([
    { key: 'length', value: 'Abcdefg1!', expected: true, description: 'length' },
    { key: 'length', value: 'Ab1!', expected: false, description: 'length too short' },
    { key: 'uppercase', value: 'abcdefg1!', expected: false, description: 'no uppercase' },
    { key: 'uppercase', value: 'Abcdefg1!', expected: true, description: 'has uppercase' },
    { key: 'lowercase', value: 'ABCDEFG1!', expected: false, description: 'no lowercase' },
    { key: 'lowercase', value: 'Abcdefg1!', expected: true, description: 'has lowercase' },
    { key: 'number', value: 'Abcdefg!', expected: false, description: 'no number' },
    { key: 'number', value: 'Abcdefg1!', expected: true, description: 'has number' },
    { key: 'symbol', value: 'Abcdefg1', expected: false, description: 'no symbol' },
    { key: 'symbol', value: 'Abcdefg1!', expected: true, description: 'has symbol' },
  ])('correctly validates $description', ({ key, value, expected }) => {
    render(<PasswordRequirements passwordValue={value} />);
    
    // Find the specific requirement label
    const labelText = requirements.find(r => r.key === key)!.label;
    const requirementLabel = screen.getByText(labelText);
    const requirementItem = requirementLabel.closest('div');
    
    if (!requirementItem) throw new Error('Could not find requirement item');
    
    const circle = requirementItem.querySelector('span.w-4.h-4');
    
    if (expected) {
      expect(circle).toHaveTextContent('✓');
      expect(circle).toHaveClass('bg-[#10B981]');
      expect(circle).toHaveClass('text-white');
    } else {
      expect(circle).toHaveTextContent('✕');
      expect(circle).toHaveClass('bg-[#E11D48]/20');
      expect(circle).toHaveClass('text-[#E11D48]');
    }
  });

  // Test transition from empty to valid
  test('transitions correctly from empty to valid state', () => {
    const { rerender } = render(<PasswordRequirements passwordValue="" />);
    
    // Initially all should be empty state (○)
    let requirementLabels = screen.getAllByText(/Mínimo 8 caracteres|Uma letra maiúscula|Uma letra minúscula|Um número|Um símbolo/);
    requirementLabels.forEach((label) => {
      const item = label.closest('div');
      if (!item) throw new Error('Could not find parent div');
      
      const circle = item.querySelector('span.w-4.h-4');
      expect(circle).toHaveTextContent('○');
      expect(circle).toHaveClass('bg-gray-100');
    });
    
    // Update to a valid password
    rerender(<PasswordRequirements passwordValue="Abcdefg1!" />);
    
    // Now all should be valid state (✓)
    requirementLabels = screen.getAllByText(/Mínimo 8 caracteres|Uma letra maiúscula|Uma letra minúscula|Um número|Um símbolo/);
    requirementLabels.forEach((label) => {
      const item = label.closest('div');
      if (!item) throw new Error('Could not find parent div');
      
      const circle = item.querySelector('span.w-4.h-4');
      expect(circle).toHaveTextContent('✓');
      expect(circle).toHaveClass('bg-[#10B981]');
      expect(circle).toHaveClass('text-white');
      
      expect(label).toHaveClass('line-through');
    });
  });
});

// Define requirements array for test usage (same as in component)
const requirements = [
  { key: "length", label: "Mínimo 8 caracteres", test: (pwd: string) => pwd.length >= 8 },
  { key: "uppercase", label: "Uma letra maiúscula", test: (pwd: string) => /[A-Z]/.test(pwd) },
  { key: "lowercase", label: "Uma letra minúscula", test: (pwd: string) => /[a-z]/.test(pwd) },
  { key: "number", label: "Um número", test: (pwd: string) => /\d/.test(pwd) },
  { key: "symbol", label: "Um símbolo (@$!%*?&)", test: (pwd: string) => /[@$!%*?&]/.test(pwd) },
];