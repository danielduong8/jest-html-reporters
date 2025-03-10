import React from 'react';

import {
  Card,
  Col,
  Row,
} from 'antd';

import {
  getPercentage,
  scrollTo,
} from '@/untils';

import { Consumer } from '../contexts/expand';

export const MyCardItem = ({
  labelColor,
  label,
  title,
  content,
  clickHandler,
}) => (<Card
  data-sign="MyCardItem"
  onClick={clickHandler}
  bodyStyle={{ padding: '12px' }}
  hoverable>
  <p className='card_item_label' style={{ color: labelColor }}>
    {label}
  </p>
  <p className='card_item_title' style={{ color: labelColor }}>{title}</p>
  <p className='card_item_content'>{content}</p>
</Card>);


const getScrollDownFunc = test => toggleExpand => () => test && scrollTo(test.testFilePath, toggleExpand)

const DashBoard = ({
  numTotalTests,
  numTotalTestSuites,
  numFailedTestSuites,
  numFailedTests,
  numPendingTestSuites,
  numPendingTests,
  numTodoTests,
  numRuntimeErrorTestSuites,
  testResults,
}) => {
  const failedTest = testResults.find(({ numFailingTests }) => numFailingTests)
  const pendingTest = testResults.find(({ numPendingTests }) => numPendingTests)
  const todoTest = testResults.find(({ numTodoTests }) => numTodoTests)
  const execErrorTest = testResults.find(({ testExecError }) => testExecError)

  const TotalTestSuites = {
    title: numTotalTestSuites,
    content: 'Test Suites Total'
  }
  const TotalTests = {
    title: numTotalTests,
    content: 'Tests Total'
  }
  const FailedTestSuites = {
    title: numFailedTestSuites,
    content: 'Failed Suites',
    label: `${getPercentage(numFailedTestSuites, numTotalTestSuites)} %`,
    labelColor: '#cf1322',
    clickHandler: getScrollDownFunc(failedTest),
  }
  const FailedTests = {
    title: numFailedTests,
    content: 'Failed Tests',
    label: `${getPercentage(numFailedTests, numTotalTests)} %`,
    labelColor: '#cf1322',
    clickHandler: getScrollDownFunc(failedTest),
  }
  const PendingTestSuites = {
    title: numPendingTestSuites,
    content: 'Pending Suites',
    label: `${getPercentage(numPendingTestSuites, numTotalTestSuites)} %`,
    labelColor: '#faad14',
    clickHandler: getScrollDownFunc(pendingTest),
  }
  const PendingTests = {
    title: numPendingTests,
    content: 'Pending Tests',
    label: `${getPercentage(numPendingTests, numTotalTests)} %`,
    labelColor: '#faad14',
    clickHandler: getScrollDownFunc(pendingTest),
  }
  const cardsList = [TotalTestSuites, TotalTests, FailedTestSuites, FailedTests, PendingTestSuites,
    PendingTests]
  if (numTodoTests) {
    const TodoTests = {
      title: numTodoTests,
      content: 'Todo Tests',
      label: `${getPercentage(numTodoTests, numTotalTests)} %`,
      labelColor: '#d466d6',
      clickHandler: getScrollDownFunc(todoTest),
    }
    cardsList.push(TodoTests)
  }
  if (numRuntimeErrorTestSuites) {
    const RuntimeErrorTestSuites = {
      title: numRuntimeErrorTestSuites,
      content: 'Runtime Error Suites',
      label: `${getPercentage(numRuntimeErrorTestSuites, numTotalTestSuites)} %`,
      labelColor: '#cf1322',
      clickHandler: getScrollDownFunc(execErrorTest),
    }
    cardsList.push(RuntimeErrorTestSuites)
  }
  const length = cardsList.length
  const gutter = (24 % length) ? 0 : 12
  return <Consumer>
    {
      ({ toggleExpand }) => (
        <div className='dash_board'>
          <Row
            gutter={gutter}
            type='flex'
            justify='space-around'>
            {
              cardsList.map(item =>
                <Col key={item.content} span={Math.floor(24 / length)}>
                  <MyCardItem
                    {...item}
                    clickHandler={item.clickHandler && item.clickHandler(toggleExpand)} />
                </Col>
              )
            }
          </Row>
        </div>
      )
    }

  </Consumer>
}

export default DashBoard
