import {publicAsset} from './paths';
import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './styles.css';
class ErrorBoundary extends React.Component<{children:React.ReactNode},{error:boolean}>{state={error:false};static getDerivedStateFromError(){return {error:true};}render(){return this.state.error?<div className="fatal-error"><img src={publicAsset('/stickers/smol-ghost.svg')} alt=""/><h1>A little hiccup.</h1><p>Something interrupted the studio. Your saved stickers are safe.</p><button className="button yellow" onClick={()=>location.reload()}>Reopen the studio</button></div>:this.props.children;}}
createRoot(document.getElementById('root')!).render(<React.StrictMode><ErrorBoundary><App/></ErrorBoundary></React.StrictMode>);
