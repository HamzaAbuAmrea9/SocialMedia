import React, { useState } from 'react';

const Sidebar = () => {
  // State for active menu item
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  // State for message search value
  const [messageSearchValue, setMessageSearchValue] = useState('');

  // State for theme modal visibility
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  // State for selected font size
  const [selectedFontSize, setSelectedFontSize] = useState(null);

  // State for selected color palette
  const [selectedColor, setSelectedColor] = useState(null);

  // State for background selection
  const [selectedBg, setSelectedBg] = useState(null);

  const menuItems = ['Item 1', 'Item 2', 'Item 3'];
  const messages = [{ name: 'Message 1' }, { name: 'Message 2' }, { name: 'Message 3' }];
  const fontSize = ['Font Size 1', 'Font Size 2', 'Font Size 3'];
  const colorPalette = ['Color 1', 'Color 2', 'Color 3'];


  // Function to handle menu item click
  const handleMenuItemClick = (item) => {
    setActiveMenuItem(item);
    if (item !== 'notifications') {
      // Handle other menu item click actions
    } else {
      // Handle notifications menu item click actions
    }
  };

  // Function to handle message search
  const handleSearchMessage = (e) => {
    setMessageSearchValue(e.target.value.toLowerCase());
  };

  // Function to handle theme modal open
  const handleOpenThemeModal = () => {
    setThemeModalVisible(true);
  };

  // Function to handle theme modal close
  const handleCloseThemeModal = (e) => {
    if (e.target.classList.contains('customize-theme')) {
      setThemeModalVisible(false);
    }
  };

  // Function to handle font size selection
  const handleFontSizeSelect = (fontSize) => {
    setSelectedFontSize(fontSize);
    // Update font size related styles
  };

  // Function to handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    // Update color related styles
  };

  // Function to handle background selection
  const handleBgSelect = (bg) => {
    setSelectedBg(bg);
    // Update background related styles
  };

  return (
    <div className="sidebar">
      {/* Sidebar content */}
      {/* Menu items */}
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`menu-item ${item === activeMenuItem ? 'active' : ''}`}
          onClick={() => handleMenuItemClick(item)}
        >
          {item}
        </div>
      ))}
      
      {/* Messages */}
      <div id="messages-notifications" className="messages-notifications">
        {/* Message search */}
        <input
          type="text"
          id="message-search"
          value={messageSearchValue}
          onChange={handleSearchMessage}
        />
        {/* Messages display */}
        <div className="messages">
          {/* Message cards */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.name.toLowerCase().includes(messageSearchValue) ? 'visible' : 'hidden'}`}
            >
              {/* Message content */}
            </div>
          ))}
        </div>
      </div>

      {/* Theme customization */}
      <div id="theme" className="theme" onClick={handleOpenThemeModal}>
        {/* Theme modal */}
        {themeModalVisible && (
          <div className="customize-theme" onClick={handleCloseThemeModal}>
            {/* Theme customization options */}
          </div>
        )}
      </div>

      {/* Font size selectors */}
      <div className="choose-size">
        {fontSize.map((size, index) => (
          <span
            key={index}
            className={`font-size-${index + 1} ${selectedFontSize === `font-size-${index + 1}` ? 'active' : ''}`}
            onClick={() => handleFontSizeSelect(`font-size-${index + 1}`)}
          >
            {`Font Size ${index + 1}`}
          </span>
        ))}
      </div>

      {/* Color palette selectors */}
      <div className="choose-color">
        {colorPalette.map((color, index) => (
          <span
            key={index}
            className={`color-${index + 1} ${selectedColor === `color-${index + 1}` ? 'active' : ''}`}
            onClick={() => handleColorSelect(`color-${index + 1}`)}
          >
            {`Color ${index + 1}`}
          </span>
        ))}
      </div>

      {/* Background selectors */}
      <div className="choose-bg">
        <div
          className={`bg-1 ${selectedBg === 'bg-1' ? 'active' : ''}`}
          onClick={() => handleBgSelect('bg-1')}
        >
          Background 1
        </div>
        <div
          className={`bg-2 ${selectedBg === 'bg-2' ? 'active' : ''}`}
          onClick={() => handleBgSelect('bg-2')}
        >
          Background 2
        </div>
        <div
          className={`bg-3 ${selectedBg === 'bg-3' ? 'active' : ''}`}
          onClick={() => handleBgSelect('bg-3')}
        >
          Background 3
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
