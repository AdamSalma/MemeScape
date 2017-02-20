import React, { Component } from "react";
import classNames from "classnames";

import {version} from "../../../../package.json"
import {
    Logo,
    Icon,
    SearchBox,
    Hierarchy,
    HeaderItem
} from "../../components"


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.returnHome = this.returnHome.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.threadIsActive !== this.props.threadIsActive) {
            // thread changed, toggle header
            // close on thread open, reveal on thread close
            this.props.scrollHeader(!nextProps.threadIsActive)
            
        }
    }

    render() {
        // Actions
        const { scrollPage, scrollHeader, closeThread, toggleNavbar, toggleHeaderPanel } = this.props;
        // State
        const { threadIsActive, provider, boardID, threadID } = this.props;

        const placeholder = `Search ${threadIsActive ? "thread" : "board"} ...`

        return (
            <div id="header" className="header">
                <div className="header-background"/>
                <div className='header-content'>
                    <HeaderItem className="has-icon" onClick={this.toggleActive}>
                        <Icon name="menu" onClick={toggleNavbar}/>
                    </HeaderItem>
                    <HeaderItem className="version">
                        Lurka v{version}
                    </HeaderItem>
                    <HeaderItem className="breadcrumb">
                        <Hierarchy provider={provider} boardID={boardID} threadID={threadID}/>
                    </HeaderItem>
                    <HeaderItem className="searchbox">
                        <SearchBox placeholder={placeholder} onKeyUp={this.handleKeyUp}/>
                    </HeaderItem>
                    <HeaderItem className="has-icon shift-right" onClick={this.toggleActive}>
                        <Icon name="eye" onClick={toggleHeaderPanel.bind(null, 'watch')} />
                    </HeaderItem>
                    <HeaderItem className="has-icon" onClick={this.toggleActive}>
                        <Icon name="archive" onClick={toggleHeaderPanel.bind(null, 'archive')} />
                    </HeaderItem>
                    <HeaderItem className="has-icon" onClick={this.toggleActive}>
                        <Icon name="filter" onClick={toggleHeaderPanel.bind(null, 'filter')}/>
                    </HeaderItem>
                    <HeaderItem className="has-icon" onClick={this.toggleActive}>
                        <Icon name="sort" onClick={toggleHeaderPanel.bind(null, 'sort')}/>
                    </HeaderItem>
                </div>
            </div>
        )  // TODO: Add filter functionality + buttons
    }

    returnHome(){
        const { closeThread, scrollPage, destroyBoard, scrollHeader } = this.props

        closeThread({
            theradID: null,  // threadID
            callback: () => {
                scrollHeader(false)  // hide header
                scrollPage({
                    page: "board", 
                    direction: "down",
                    callback: destroyBoard
                })   
            }
        })
    }

    handleKeyUp(event) {
        this.props.searchBoard(event.target.value)
    }

    toggleActive(e) {
        console.log('toggling active')
        e.target.classList.toggle('active')
    }
}
