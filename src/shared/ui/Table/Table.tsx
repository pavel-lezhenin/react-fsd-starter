import type { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes, ReactNode } from 'react';

import { cn } from '@shared/lib';

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  readonly children: ReactNode;
}

export function Table({ children, className, ...props }: TableProps): JSX.Element {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  readonly children: ReactNode;
}

export function TableHeader({ children, className, ...props }: TableHeaderProps): JSX.Element {
  return (
    <thead className={cn('[&_tr]:border-b', className)} {...props}>
      {children}
    </thead>
  );
}

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  readonly children: ReactNode;
}

export function TableBody({ children, className, ...props }: TableBodyProps): JSX.Element {
  return (
    <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props}>
      {children}
    </tbody>
  );
}

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  readonly children: ReactNode;
}

export function TableRow({ children, className, ...props }: TableRowProps): JSX.Element {
  return (
    <tr
      className={cn(
        'border-b transition-colors hover:bg-secondary/5 data-[state=selected]:bg-secondary/10',
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  readonly children?: ReactNode;
}

export function TableHead({ children, className, ...props }: TableHeadProps): JSX.Element {
  return (
    <th
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-secondary',
        '[&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  readonly children?: ReactNode;
}

export function TableCell({ children, className, ...props }: TableCellProps): JSX.Element {
  return (
    <td
      className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    >
      {children}
    </td>
  );
}

interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {
  readonly children: ReactNode;
}

export function TableCaption({ children, className, ...props }: TableCaptionProps): JSX.Element {
  return (
    <caption className={cn('mt-4 text-sm text-secondary', className)} {...props}>
      {children}
    </caption>
  );
}
