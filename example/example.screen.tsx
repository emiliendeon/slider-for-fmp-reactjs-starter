import React from "react";
import styled from "styled-components";

import colors from "../../themes/colors.theme";
import Container from "../../components/style/container.component";
import Content from "../../components/style/content.component";
import Slider from "../../components/slider.component";

const SliderItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 300px;
    background-color: ${colors.light};
    border: 1px solid ${colors.primary};
    border-radius: 10px;
`;

const HomeScreen = () => {
    const Items = Array(15)
        .fill(0)
        .map((_, key) => () => <SliderItem key={key}>{key + 1}</SliderItem>);

    return (
        <Container>
            <Content
                style={{
                    width: "100%",
                }}
            >
                <Slider
                    title="My slider"
                    items={Items}
                    style={{
                        width: "90%",
                    }}
                />
            </Content>
        </Container>
    );
};

export default HomeScreen;
