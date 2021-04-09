import React, { useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";

import Text from "./style/text.component";
import { useResize } from "../utils/layout.utils";
import Button from "./forms/button.component";

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const Title = styled(Text)`
    position: absolute;
    top: 2px;
    left: 0;
    width: calc(100% - 100px);
`;

const Arrows = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: row;
`;

const SliderContainer = styled.div`
    align-self: stretch;
    margin: 55px -10px 0 -10px;
    display: flex;
    flex-direction: row;
    overflow: hidden;
`;

const Slider = styled.div`
    display: flex;
    flex-direction: row;
`;

const ItemWrapper = styled.div`
    display: flex;
    padding: 0 10px;
`;

type SliderProps = {
    title?: string;
    items: React.ElementType[];
    style?: Object;
};

export default (props: SliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderContainer = useRef();
    const sliderItem = useRef();

    const { width: sliderContainerWidth } = useResize(sliderContainer);
    const { width: sliderItemWidth } = useResize(sliderItem);

    const FirstItem = props.items[0];
    const otherItems = props.items.slice(
        1,
        currentIndex + Math.ceil(sliderContainerWidth / sliderItemWidth)
    );

    const sliderItemsWidth = (otherItems.length + 1) * sliderItemWidth;

    const sliderOffset =
        sliderItemsWidth < sliderContainerWidth
            ? 0
            : Math.min(sliderItemsWidth - sliderContainerWidth, sliderItemWidth * currentIndex);

    const decrementCurrentIndex = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    };

    const incrementCurrentIndex = () => {
        if (sliderOffset < sliderItemsWidth - sliderContainerWidth) {
            setCurrentIndex(prev => Math.min(otherItems.length, prev + 1));
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: incrementCurrentIndex,
        onSwipedRight: decrementCurrentIndex,
    });

    return (
        <Wrapper style={props?.style}>
            {props.title ? <Title>{props.title}</Title> : null}
            <Arrows>
                <Button
                    text="&lt;"
                    onClick={decrementCurrentIndex}
                    style={{
                        width: 35,
                    }}
                />
                <Button
                    text="&gt;"
                    onClick={incrementCurrentIndex}
                    style={{
                        width: 35,
                        marginLeft: 16,
                    }}
                />
            </Arrows>
            <SliderContainer ref={sliderContainer}>
                <Slider
                    {...swipeHandlers}
                    style={{
                        marginLeft: -sliderOffset,
                    }}
                >
                    {FirstItem ? (
                        <ItemWrapper ref={sliderItem}>
                            <FirstItem />
                        </ItemWrapper>
                    ) : null}
                    {otherItems.map((item, index) => {
                        const Item = item;
                        return (
                            <ItemWrapper key={index}>
                                <Item />
                            </ItemWrapper>
                        );
                    })}
                </Slider>
            </SliderContainer>
        </Wrapper>
    );
};
