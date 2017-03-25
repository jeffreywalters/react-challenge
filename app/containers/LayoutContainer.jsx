import React from 'react'


const footerStyles = { backgroundColor: '#eee', padding: '20px' }
const bodyStyles = { backgroundColor: '#F9F9F9' }
const headerStyle = {backgroundColor: '#eee'}

const Layout = (props) => (
  <div>
    <header className='container' style={headerStyle}>
      <div className="page-header">
        <h2>React Challenge <small>Jeff Walters</small></h2>
      </div>
    </header>
    <div className='container' style={bodyStyles}>
      {props.children}
    </div>
    <footer className='container' style={footerStyles}>
      https://github.com/jeffreywalters/react-challenge
    </footer>
  </div>
)
Layout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default Layout
