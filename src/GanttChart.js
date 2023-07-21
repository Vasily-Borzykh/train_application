import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GanttChart = ({ data }) => {
  const chartRef = useRef(null);
  const width = 800;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 30, left: 60 };

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3.scaleTime()
      .domain([d3.min(data, (d) => d.start), d3.max(data, (d) => d.end)])
      .range([0, innerWidth]);

    const y = d3.scaleBand()
      .domain(data.map((d) => d.train))
      .range([0, innerHeight])
      .padding(0.1);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).tickSize(0).tickPadding(6);

    svg.selectAll('g').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis);

    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    const bars = g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.start))
      .attr('y', (d) => y(d.train))
      .attr('width', (d) => x(d.end) - x(d.start))
      .attr('height', y.bandwidth())
      .attr('fill', 'steelblue')
      .call(d3.drag().on('drag', dragMove));

    function dragMove(event, d) {
      const draggedBar = d3.select(this);
      const newX = Math.max(0, Math.min(innerWidth - (x(d.end) - x(d.start)), event.x - margin.left));
      const newY = y(d.train);

      const overlappingBars = bars.filter((barData) => {
        return (
          barData !== d &&
          barData.train === d.train &&
          ((x(barData.start) < x(d.end) && x(barData.end) > x(d.start)) ||
            (x(barData.start) < x(d.end) && x(barData.end) > x(d.end)) ||
            (x(barData.start) > x(d.start) && x(barData.start) < x(d.end)))
        );
      });

      if (overlappingBars.empty()) {
        d.start = x.invert(newX);
        d.end = x.invert(newX + (x(d.end) - x(d.start)));

        draggedBar
          .attr('x', newX)
          .attr('y', newY);
      }
    }
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default GanttChart;
