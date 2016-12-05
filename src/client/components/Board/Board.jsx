import React, { Component } from "react";

import '../../vendor';

import BoardPost from '../BoardPost';
import { catchTooltip } from './events';
import createLayout from './layout';

export default class Board extends Component {
    constructor({ board, boardID, provider, fetchBoard }) {
        super();
        this.state = {
            incrementAmount: 10
        }

        this.onBoardPostClick = this.onBoardPostClick.bind(this)
        this.incrementBoardLimit = this.incrementBoardLimit.bind(this)

    }

    componentDidMount() {
        const { board } = this.refs
        const { incrementLimit } = this.props
        const $board = $(board)

        // Board scroller
        $board.nanoScroller({ sliderMaxHeight: 400, sliderMinHeight: 60 })

        $board.onscroll
        // Hover over board posts reveals more info
        createLayout()
        catchTooltip(board);  // TODO: Implement catchtooltip on board

        $board.on('scrollend', this.incrementBoardLimit)
    }


    componentDidUpdate({ board }) {
        if (board.posts.length !== this.props.board.posts.length) {
            createLayout()
            const $board = $(this.refs.board)
            $board.nanoScroller()
            $board.on('scrollend', this.incrementBoardLimit)
        }
    }

    componentWillUnmount() {
        $(this.refs.board).off('hover scrollend');
    }

    render() {
        const {provider, boardID} = this.props
        return (
            <div id="board" className="board nano" ref='board' onScroll={this.handleScroll}>
                <div className="nano-content">
                    <div className="board-header">
                        <h1>{`${provider} -> /${boardID}/`}</h1>
                    </div>
                    <div className="posts">
                        {this.createThreads()}
                    </div>
                </div>
            </div>
        );
    }

    createThreads() {
        const { posts, limit } = this.props.board;
        return posts.slice(0, limit).map( post => {
            return (
                <BoardPost
                    key={post.id}
                    post={post} 
                    fetchThread={this.onBoardPostClick}
                    reshuffle={createLayout}
                />
            );
        });
    }
    
    incrementBoardLimit() {
        const { incrementLimit, board } = this.props
        const newValue = this.props.board.limit + this.state.incrementAmount
        console.log('End of board. newValue:' + newValue)
        incrementLimit(newValue)    
    }


    onBoardPostClick( threadID ){
        // Fetch if user not highlighting any text
        if (!window.getSelection().toString()) {
            const { provider, boardID, fetchThread } = this.props;
            $('.thread-wrap').nanoScroller({ stop: true })  // hide scrollbar on thread
            fetchThread(provider, boardID, threadID);
        }
    }

    handleScroll(event) {
        console.log(event)
    }
}
