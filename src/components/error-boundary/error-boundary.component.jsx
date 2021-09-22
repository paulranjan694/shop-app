import React, { Component } from 'react';
import './error-boundary.styles.scss';

class ErrorBoundary extends Component {

    constructor(){
        super();

        this.state = {
            hasError: false
        }
    }
    
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
      }
    
      componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
      }

    render() {
       if(this.state.hasError){
           return (
               <div className='error-image-overlay'>
                   <div className='error-image-container'></div>
                   <div className='error-image-text'>Sorry this page is broken</div>
               </div>
           );
       }

       return this.props.children;
    }
}

export default ErrorBoundary;
