import React from 'react'

const Layout = (props) => (
  <div className='wrapper'>
    <header>Header</header>
    {props.children}
    <footer>Footer</footer>
  </div>
)
Layout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default Layout
