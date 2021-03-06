import React from 'react';
import styled from '@emotion/styled';
import classNames from 'classnames';

import ActionButton from './button';
import ConfirmableAction from './confirmableAction';

type ConfirmableActionProps = React.ComponentProps<typeof ConfirmableAction>;

type Props = Omit<
  ConfirmableActionProps,
  'onConfirm' | 'confirmText' | 'children' | 'stopPropagation' | 'priority'
> & {
  title: string;
  onAction?: () => void;
  children?: React.ReactNode;
  type?: 'button';
  disabled?: boolean;
  className?: string;
  shouldConfirm?: boolean;
  confirmPriority?: ConfirmableActionProps['priority'];
  confirmLabel?: string;
} & Partial<React.ComponentProps<typeof ActionButton>>;

export default function ActionLink({
  message,
  className,
  title,
  onAction,
  type,
  confirmLabel,
  disabled,
  children,
  shouldConfirm,
  confirmPriority,
  ...props
}: Props) {
  const action = (
    <StyledAction
      as={type === 'button' ? ActionButton : 'a'}
      aria-label={title}
      className={classNames(className, {disabled})}
      onClick={disabled ? undefined : onAction}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledAction>
  );

  if (shouldConfirm && onAction) {
    return (
      <ConfirmableAction
        shouldConfirm={shouldConfirm}
        priority={confirmPriority}
        disabled={disabled}
        message={message}
        confirmText={confirmLabel}
        onConfirm={onAction}
        stopPropagation={disabled}
      >
        {action}
      </ConfirmableAction>
    );
  }

  return action;
}

const StyledAction = styled('a')<{
  as: any;
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  ${p =>
    p.disabled &&
    `
    cursor: not-allowed;
    `}
`;
