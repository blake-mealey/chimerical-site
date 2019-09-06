import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const StyledSvg = styled.svg`
    text-align: center;
`;

function useRenderGraph(items, size) {
    // Create the pack layout
    const pack = d3.pack()
        .size(size)
        .padding(10);

    // Process the data into a hierarchical structure
    const root = d3.hierarchy({ children: items })
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value)
        .each(d => {
            if (d.data.label) {
                d.label = d.data.label;
                d.id = d.data.label.toLowerCase().replace(/ |\//g, `-`);
            }
        });

    // Pass the data to the pack layout to calculate the distribution
    const nodes = pack(root).leaves();

    return nodes;
}

function useRenderBubbles(svg, nodes) {
    const chart = d3.select(svg).append(`g`)
        .attr(`class`, `bubble-chart`);
    
    const node = chart.selectAll(`.node`)
        .data(nodes)
        .enter().append(`g`)
            .attr(`class`, `node`)
            .attr(`transform`, d => `translate(${d.x},${d.y})`)
            .on(`click`, d => console.log(`clicked ${d}`));
    
    node.append(`title`)
        .text(d => d.label);

    node.append(`circle`)
        .attr(`id`, d => d.id)
        .attr(`r`, d => d.r)
        .attr(`fill`, `none`)
        .attr(`stroke-width`, 2)
        .attr(`stroke`, d => d.data.color)
        .style(`z-index`, 1);

    const imageScale = 1.25;
    node.append(`image`)
        .attr(`xlink:href`, d => d.data.imageUrl)
        .attr(`width`, d => d.r * imageScale)
        .attr(`height`, d => d.r * imageScale)
        .attr(`transform`, d => `translate(${-d.r*imageScale / 2},${-d.r*imageScale / 2})`);
}

function getSize(container) {
    const dimension = Math.min(container.clientWidth, window.innerHeight);
    return [dimension, dimension];
}

const ImageBubbleChart = ({ items }) => {
    // Get references to the container and SVG
    const containerRef = useRef(null);
    const svgRef = useRef(null);

    // Get the current size to render the chart at
    const [size, setSize] = useState(null);

    useEffect(() => {
        // Get the current container and SVG
        const container = containerRef.current;
        const svg = svgRef.current;

        // If we don't have a size yet (initial render), set the size to the container's width squared
        if (size === null) {
            setSize(getSize(container));
            return;
        }

        // Clear the SVG element
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        // Update the SVG's width and height to the size from state
        svg.setAttribute(`width`, size[0]);
        svg.setAttribute(`height`, size[1]);

        // Render the graph
        const nodes = useRenderGraph(items, size);
        useRenderBubbles(svg, nodes);

        // Listen to the container resizing, and update the size state
        const resizeObserver = new ResizeObserver(() => {
            const newSize = getSize(container);
            if (size[0] !== newSize[0] || size[1] !== newSize[1]) {
                setSize(newSize);
            }
        });
        resizeObserver.observe(container);

        // Stop listening to the container resizing when this effect is cleaned up
        return () => {
            resizeObserver.unobserve(container);
        };
    });

    return (
        <StyledContainer ref={containerRef}>
            <StyledSvg ref={svgRef}></StyledSvg>
        </StyledContainer>
    );
};

export default ImageBubbleChart;