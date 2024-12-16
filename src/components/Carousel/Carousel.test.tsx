import '@testing-library/jest-dom';
import { expect, test, vi } from 'vitest';
import { render, act, waitFor } from '@testing-library/react';
import { Carousel } from './Carousel';
import range from 'lodash/range';

// <CarouselGroup listItems={group} key={index} classes={groupClass} />
vi.mock(import('./CarouselGroup'), () => {
  return {
    CarouselGroup: ({ listItems }: any) => listItems,
  };
});

const testList = () =>
  range(0, 16).map((i) => <div key={i} data-testid={`test-${i}`} />);

// When the default viewport size is less than the smallest breakpoint therefore we expect
// a groupSize of 2. With that groupSize we expect that [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
// becomes [[0,1],[2,3],[4,5],[6,7],[8,9],[10,11],[12,13],[14,15],[0,1]]. This is to allow seemless infinite scrolling.
test('should correctly chunk and wrap groups for seamless infinite scrolling with small viewport size', () => {
  const { getAllByTestId } = render(<Carousel listItems={testList()} />);
  const divs = getAllByTestId(/test-/);
  const dataTestIds = divs.map((div) => div.getAttribute('data-testid'));
  expect(dataTestIds).toEqual([
    'test-0',
    'test-1',
    'test-2',
    'test-3',
    'test-4',
    'test-5',
    'test-6',
    'test-7',
    'test-8',
    'test-9',
    'test-10',
    'test-11',
    'test-12',
    'test-13',
    'test-14',
    'test-15',
    'test-0',
    'test-1',
  ]);
});

// Same idea here but with a groupSize of 4, you expect the first 4 elements to be copied to the end of the array in the final result
test('should correctly chunk and wrap groups for seamless infinite scrolling with medium viewport size', () => {
  Object.defineProperty(document.documentElement, 'clientWidth', {
    value: 700,
    configurable: true, // Allows overwriting the property again later
  });
  const { getAllByTestId } = render(<Carousel listItems={testList()} />);
  const divs = getAllByTestId(/test-/);
  const dataTestIds = divs.map((div) => div.getAttribute('data-testid'));
  expect(dataTestIds).toEqual([
    'test-0',
    'test-1',
    'test-2',
    'test-3',
    'test-4',
    'test-5',
    'test-6',
    'test-7',
    'test-8',
    'test-9',
    'test-10',
    'test-11',
    'test-12',
    'test-13',
    'test-14',
    'test-15',
    'test-0',
    'test-1',
    'test-2',
    'test-3',
  ]);
});

// And again but with a groupSize of 8
test('should correctly chunk and wrap groups for seamless infinite scrolling with large viewport size', () => {
  Object.defineProperty(document.documentElement, 'clientWidth', {
    value: 2000,
    configurable: true,
  });
  const { getAllByTestId } = render(<Carousel listItems={testList()} />);
  const divs = getAllByTestId(/test-/);
  const dataTestIds = divs.map((div) => div.getAttribute('data-testid'));
  expect(dataTestIds).toEqual([
    'test-0',
    'test-1',
    'test-2',
    'test-3',
    'test-4',
    'test-5',
    'test-6',
    'test-7',
    'test-8',
    'test-9',
    'test-10',
    'test-11',
    'test-12',
    'test-13',
    'test-14',
    'test-15',
    'test-0',
    'test-1',
    'test-2',
    'test-3',
    'test-4',
    'test-5',
    'test-6',
    'test-7',
  ]);
});

test('clicking pagePrevious button increments focusedGroup', async () => {
  vi.useFakeTimers();
  Object.defineProperty(document.documentElement, 'clientWidth', {
    value: 20,
    configurable: true, // Allows overwriting the property again later
  });
  const { getByTestId, getAllByTestId } = render(
    <Carousel listItems={testList()} />
  );
  const prevButton = getByTestId('prev-button');
  expect(prevButton).toBeInTheDocument();
  act(() => {
    prevButton.click();
  });
  act(() => vi.runAllTimers());

  const divs2 = getAllByTestId(/test-/);
  const dataTestIds2 = divs2.map((div) => div.getAttribute('data-testid'));

  // Expect next
  expect(dataTestIds2).toEqual([
    'test-14',
    'test-15',
    'test-0',
    'test-1',
    'test-2',
    'test-3',
    'test-4',
    'test-5',
    'test-6',
    'test-7',
    'test-8',
    'test-9',
    'test-10',
    'test-11',
    'test-12',
    'test-13',
    'test-14',
    'test-15',
  ]);

  vi.useRealTimers();
});

test('clicking pageNext button increments focusedGroup', async () => {
  vi.useFakeTimers();
  Object.defineProperty(document.documentElement, 'clientWidth', {
    value: 20,
    configurable: true, // Allows overwriting the property again later
  });
  const { getByTestId, getAllByTestId } = render(
    <Carousel listItems={testList()} />
  );
  const nextButton = getByTestId('next-button');
  expect(nextButton).toBeInTheDocument();
  act(() => {
    nextButton.click();
  });
  act(() => vi.runAllTimers());

  const divs2 = getAllByTestId(/test-/);
  const dataTestIds2 = divs2.map((div) => div.getAttribute('data-testid'));

  // Expect next
  expect(dataTestIds2).toEqual([
    'test-2',
    'test-3',
    'test-4',
    'test-5',
    'test-6',
    'test-7',
    'test-8',
    'test-9',
    'test-10',
    'test-11',
    'test-12',
    'test-13',
    'test-14',
    'test-15',
    'test-0',
    'test-1',
    'test-2',
    'test-3',
  ]);

  vi.useRealTimers();
});
