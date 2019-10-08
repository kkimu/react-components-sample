/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'

const ArrowBase = styled.a({
  position: 'absolute',
  top: '50%',
  display: 'block',
  color: '#111',
  cursor: 'pointer',
  opacity: 0.75,
  transform: 'translateY(-50%)',
  transition: 'opacity .15s cubic-bezier(.4, 0, 1, 1)',

  '&:focus': {
    outline: 0,
  },

  '&:hover': {
    opacity: 0.5,
  },
})

const CarouselLeftArrow = (props: any) => (
  <ArrowBase
    href="#"
    css={{ left: 32 }}
    onClick={props.onClick}
  >
    left
  </ArrowBase>
)

const CarouselRightArrow = (props: any) => (
  <ArrowBase
    href="#"
    css={{ right: 32 }}
    onClick={props.onClick}
  >
    right
  </ArrowBase>
)

const indicatorBaseStyle = css({
  display: 'block',
  width: 24,
  height: 3,
  backgroundColor: '#111',
  cursor: 'pointer',
  opacity: 0.15,
  transition: 'opacity .15s cubic-bezier(.4, 0, 1, 1)',

  '&:hover': {
    opacity: 0.5,
  },
})

const indicatorActiveStyle = css({
  '&, &:hover': {
    opacity: 0.75,
  },
})

const CarouselIndicator = (props: any) => (
  <li>
    <a
      css={[indicatorBaseStyle, props.index === props.activeIndex && indicatorActiveStyle]}
      onClick={props.onClick}
    />
  </li>
)

const SlideWrapper = styled.li({
  marginRight: 'auto',
  marginLeft: 'auto',
  display: 'none',
  maxWidth: 900,
  listStyleType: 'none',
  textAlign: 'center',

  '@media (max-width: 991px)': {
    paddingRight: 60,
    paddingLeft: 60,
  },
})

const SlideContent = styled.p({
  marginBottom: 19,
  fontFamily: `'Open Sans', 'Trebuchet MS', sans-serif`,
  fontSize: 16,

  '@media (max-width: $breakpoint-desktop - 1px)': {
    fontSize: 18,
  }
})

const CarouselSlide = (props: any) => (
  <SlideWrapper css={props.index === props.activeIndex && { display: 'block' }}>
    <SlideContent>{props.slide}</SlideContent>
  </SlideWrapper>
)

const ulStyle = css({
  padding: 0,
  margin: 0,
  listStyleType: 'none',
})

const carouselIndicatorStyle = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 20,

  li: {
    '&:nth-of-type(n + 2)': {
      marginLeft: 9,
    }
  }
})

export class Carousel extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);

    this.state = {
      activeIndex: 0
    };
  }

  goToSlide(index: any) {
    this.setState({
      activeIndex: index
    });
  }

  goToPrevSlide(e: any) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    this.setState({
      activeIndex: index
    });
  }

  goToNextSlide(e: any) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    this.setState({
      activeIndex: index
    });
  }

  render() {
    return (
      <div css={{ position: 'relative' }}>
        <CarouselLeftArrow onClick={(e: any) => this.goToPrevSlide(e)} />

        <ul css={ulStyle}>
          {this.props.slides.map((slide: any, index: any) =>
            <CarouselSlide
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              slide={slide}
            />
          )}
        </ul>

        <CarouselRightArrow onClick={(e: any) => this.goToNextSlide(e)} />

        <ul css={[ulStyle, carouselIndicatorStyle]}>
          {this.props.slides.map((slide: any, index: any) =>
            <CarouselIndicator
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              isActive={this.state.activeIndex==index}
              onClick={(e: any) => this.goToSlide(index)}
            />
          )}
        </ul>
      </div>
    );
  }
}
