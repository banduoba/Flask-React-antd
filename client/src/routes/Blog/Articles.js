import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Spin, Select, Divider } from 'antd';

import styles from './Articles.less';

@connect(state => ({
  githubNews: state.spider.githubNews,
  toutiaoNews: state.spider.toutiaoNews,
  hackerNews: state.spider.hackerNews,
  segmentNews: state.spider.segmentNews,
  jobboleNews: state.spider.jobboleNews,
}))
export default class Articles extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      newsType: 'Github'
    }
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'spider/fetchGithubNews',
    // });
  }

  componentWillUnmount() {
  }

  handleChange(value) {
    switch (value) {
      case 'Github':
        this.setState({newsType: 'Github'})
        this.props.dispatch({
          type: 'spider/fetchGithubNews',
        });
        break;
      case 'Hacker News':
        this.setState({newsType: 'Hacker News'})
        this.props.dispatch({
          type: 'spider/fetchHackerNews',
        });
        break;
      case 'Segment Fault':
        this.setState({newsType: 'Segment Fault'})
        this.props.dispatch({
          type: 'spider/fetchSegmentNews',
        });
        break;
      case '开发者头条':
        this.setState({newsType: '开发者头条'})
        this.props.dispatch({
          type: 'spider/fetchToutiaoNews',
        });
        break;
      case '伯乐头条':
        this.setState({newsType: '伯乐头条'})
        this.props.dispatch({
          type: 'spider/fetchJobboleNews',
        });
        break;
      default:
        break;
    }
  }

  render() {

    const { githubNews, toutiaoNews, hackerNews, segmentNews, jobboleNews } = this.props;
    let load = true;
    switch (this.state.newsType) {
      case "Github":
        load = githubNews.data ? false : true;
        break;
      case "Hacker News":
        load = hackerNews.data ? false : true;
        break;
      case "Segment Fault":
        load = segmentNews.data ? false : true;
        break;
      case "开发者头条":
        load = toutiaoNews.data ? false : true;
        break;
      case "伯乐头条":
        load = jobboleNews.data ? false : true;
        break;
      default:
        break;
    }

    return (
      <div>
        <p>haha</p>
      </div>
    );
  }
}
