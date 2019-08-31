import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledSvg = styled.svg`
    text-align: center;
`;

const size = [800, 700];

function useRenderGraph(items) {
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

    node.append(`image`)
        .attr(`xlink:href`, d => d.data.imageUrl)
        .attr(`width`, d => d.r * 1.5)
        .attr(`height`, d => d.r * 1.5)
        .attr(`transform`, d => `translate(${-d.r*1.5 / 2},${-d.r*1.5 / 2})`);
    
    node.append(`clipPath`)
        .attr(`id`, d => `clip-${d.id}`)
        .append(`use`)
            .attr(`xlink:href`, d => `#${d.id}`);
}

const ImageBubbleChart = ({ items }) => {
    const svgRef = useRef(null);

    // TODO: How often should we run this?
    useEffect(() => {
        const svg = svgRef.current;

        // Clear the SVG element
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        // Render the graph
        const nodes = useRenderGraph(items);
        useRenderBubbles(svg, nodes);
    });

    return (<StyledSvg ref={svgRef} width={size[0]} height={size[1]}></StyledSvg>);
};

export default ImageBubbleChart;