import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Spin, Select, Divider } from 'antd';

import styles from './NewsBoard.less';

@connect(state => ({
  githubNews: state.spider.githubNews,
  toutiaoNews: state.spider.toutiaoNews,
  hackerNews: state.spider.hackerNews,
  segmentNews: state.spider.segmentNews,
  jobboleNews: state.spider.jobboleNews,
}))
export default class NewsBoard extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'spider/fetchGithubNews',
    });
  }

  componentWillUnmount() {
  }

  handleChange(value) {
    // this.props.dispatch(selectItem(nextItem, id));
    alert('valus is '+ value);
    const { dispatch } = this.props;
    dispatch({
      type: 'spider/fetchGithubNews',
    });
  }

  render() {
    const {
      githubNews, toutiaoNews, hackerNews, segmentNews, jobboleNews
    } = this.props;
    const selectors = [
      {
        item: 'Github',
        boardId: 0,
      },
      {
        item: 'Hacker News',
        boardId: 1,
      },
      {
        item: '开发者头条',
        boardId: 2,
      },
      {
        item: 'Segment Fault',
        boardId: 3,
      },
    ];
    const boards = [];
    for (const value of selectors) {
      boards.push(value.boardId);
    }
    const options = ['Github', 'Hacker News', 'Segment Fault', '开发者头条', '伯乐头条'];

    return (
      <div>
        <Card>
          <Select defaultValue="Github" style={{ width: 160 }} onChange={this.handleChange}>
            <Select.Option value="Github">Github</Select.Option>
            <Select.Option value="Hacker News">Hacker News</Select.Option>
            <Select.Option value="Segment Fault">Segment Fault</Select.Option>
            <Select.Option value="开发者头条">开发者头条</Select.Option>
            <Select.Option value="伯乐头条">伯乐头条</Select.Option>
          </Select>
          {githubNews.data ? (
            <ul>
            {
              githubNews.data.map((post, i) => {
                return (
                  <div key={i}>
                      <a href={post.url} target="_blank">{post.title}</a>
                    {
                      post.desc ?
                        <div>
                          <div>
                            <p>{post.desc}</p>
                          </div>
                        </div>
                        : null
                    }
                    <Divider style={{ marginBottom: 32 }} />
                  </div>
                );
              }, this)
            }
            </ul>) : <Spin size="small" style={{ marginLeft: 8 }} />}
        </Card>
      </div>
    );
  }
}
