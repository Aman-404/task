import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Reusable Button component with consistent styling and behavior
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant (contained, outlined, text)
 * @param {string} props.color - Button color (primary, secondary, error, etc.)
 * @param {string} props.size - Button size (small, medium, large)
 * @param {boolean} props.loading - Show loading spinner
 * @param {boolean} props.disabled - Disable button
 * @param {boolean} props.fullWidth - Make button full width
 * @param {React.ElementType} props.startIcon - Icon to show before text
 * @param {React.ElementType} props.endIcon - Icon to show after text
 * @param {function} props.onClick - Click handler
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {string} props.className - Additional CSS classes
 */
const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
  className,
  ...props
}) => {
  const handleClick = (event) => {
    if (loading || disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={loading ? null : startIcon}
      endIcon={loading ? null : endIcon}
      onClick={handleClick}
      type={type}
      className={className}
      sx={{
        position: 'relative',
        minHeight: size === 'small' ? 32 : size === 'large' ? 48 : 40,
        ...props.sx,
      }}
      {...props}
    >
      {loading && (
        <CircularProgress
          size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
          sx={{
            position: 'absolute',
            color: variant === 'contained' ? 'inherit' : color + '.main',
          }}
        />
      )}
      <span
        style={{
          visibility: loading ? 'hidden' : 'visible',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {children}
      </span>
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'secondary',
    'success',
    'error',
    'info',
    'warning',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button;
