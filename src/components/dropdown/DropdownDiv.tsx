import React, { useRef, useState, useEffect, ReactElement } from 'react';
import DropdownMenu from './dropdown-menu/DropdownMenu';

export interface DropdownProps {
  isOpen: boolean;
  size?: string;
  buttonTemplate: React.ReactNode | ReactElement;
  menuTemplate: any;
  className?: string;
  menuContainerTag?: string;
  closeWhenClickOutside?: boolean
  onChange?: Function;
}

const Dropdown = ({
  isOpen = false,
  size = 'md',
  buttonTemplate,
  menuTemplate,
  className,
  menuContainerTag = 'div',
  closeWhenClickOutside = true,
  onChange
}: DropdownProps) => {
  const dropdownRef = useRef<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(isOpen);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: any) => {
    if (!closeWhenClickOutside) return;
    if (
      dropdownRef &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(dropdownOpen);
    }
  }, [dropdownOpen]);

  useEffect(() => {
    setDropdownOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  });

  return (
    <span
      ref={dropdownRef}
      className={`dropdown${className ? ` ${className}` : ''}`}
    >

      <a onClick={toggleDropdown}>
        {buttonTemplate}
      </a>

      {dropdownOpen ? (
        <div className='dropdown-menu dropdown-menu-left show' style={{ zIndex: "5" }}>
          {menuTemplate}
        </div>
      ) : null}
    </span>
  );
};

export default Dropdown;
