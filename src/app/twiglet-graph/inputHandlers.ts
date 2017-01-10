import { D3, Selection } from 'd3-ng2-service';
import { UUID } from 'angular2-uuid';
import { D3DragEvent } from 'd3-ng2-service';

import { TwigletGraphComponent } from './twiglet-graph.component';
import { D3Node } from '../../non-angular/interfaces';
import { EditNodeModalComponent } from '../edit-node-modal/edit-node-modal.component';


/**
 * Starts the dragging process on a node by fixing the node's location.
 *
 * @export
 * @param {D3Node} node
 */
export function dragStarted (this: TwigletGraphComponent, node: D3Node) {
  node.fx = node.x;
  node.fy = node.y;
  // this.state.twiglet.nodes.updateNode(node, this.currentNodeState);
  if (this.simulation.alpha() < 0.5) {
    this.simulation.alpha(0.5).restart();
  }
}

/**
 * Moves a node around by settings the node fixed x and y to the mouse x and y.
 *
 * @export
 * @param {D3Node} node
 */
export function dragged(this: TwigletGraphComponent, node: D3Node) {
  let e: D3DragEvent<SVGTextElement, D3Node, D3Node> = this.d3.event;
  if (this.simulation.alpha() < 0.5) {
    this.simulation.alpha(0.5).restart();
  }
  node.fx = e.x;
  node.fy = e.y;
  // this.state.twiglet.nodes.updateNode(node, this.currentNodeState);
}

/**
 * Ends the drag process by removing the fixing on a node so D3 can take controll of it's position.
 *
 * @export
 * @param {D3Node} node
 */
export function dragEnded(this: TwigletGraphComponent, node: D3Node) {
  if (this.simulation.alpha() < 0.5) {
    this.simulation.alpha(0.5).restart();
  }
  this.state.twiglet.nodes.updateNode(node, this.currentNodeState);
}

export function nodeClicked(this: TwigletGraphComponent, node: D3Node) {
  if (this.altPressed) {
    this.toggleNodeCollapsibility(node);
  } else {
    if (!this.userState.isEditing) {
      node.fx = node.x;
      node.fy = node.y;
      this.state.twiglet.nodes.updateNode(node);
    }
    this.state.userState.setCurrentNode(node.id);
  }
}

/**
 * When the user presses down on a node, this starts the linking process by creating a line and
 * a temp node.
 *
 * @export
 * @param {D3Node} node
 */
export function mouseDownOnNode(this: TwigletGraphComponent, node: D3Node) {
  this.tempLink = {
    id: UUID.UUID(),
    source: node.id,
    target: null,
  };
  this.tempLinkLine = this.d3Svg.append<SVGLineElement>('line')
  .attr('id', 'temp-draggable-link-line')
  .attr('x1', node.x)
  .attr('y1', node.y)
  .attr('x2', node.x)
  .attr('y2', node.y)
  .attr('style', 'stroke:rgb(255,0,0);stroke-width:2');
}

/**
 * Tracks movement on a canvas but only if there is a link waiting to be completed.
 *
 * @export
 * @param {TwigletGraphComponent} parent
 * @returns {() => void}
 */
export function mouseMoveOnCanvas(parent: TwigletGraphComponent): () => void {
  return function () {
    if (parent.tempLink) {
      const mouse = parent.d3.mouse(this);
      // Add one so the line doesn't capture the mouse clicks and ups.
      parent.tempLinkLine.attr('x2', mouse[0] + 1).attr('y2', mouse[1] + 1);
    }
  };
}

/**
 * This clears everything because the user mouse'd up but NOT on a node. That is, unless
 * the user is in the process of adding a new node.
 *
 * @export
 * @param {TwigletGraphComponent} parent
 * @returns {() => void}
 */
export function mouseUpOnCanvas(parent: TwigletGraphComponent): () => void {
  return function () {
    if (parent.tempLink) {
      parent.tempLink = null;
      parent.tempLinkLine.remove();
      parent.tempLinkLine = null;
    } else if (parent.userState.nodeTypeToBeAdded) {
      const mouse = parent.d3.mouse(this);
      const node: D3Node = {
        attrs: [],
        id: UUID.UUID(),
        type: parent.userState.nodeTypeToBeAdded,
        x: mouse[0],
        y: mouse[1],
      };
      parent.state.twiglet.nodes.addNode(node);
      const modelRef = parent.modalService.open(EditNodeModalComponent);
      modelRef.componentInstance.id = node.id;
    }
  };
}

/**
 * When the user completes a link by mouse-upping on a node, This completes that link, calls
 * addLink on the service and then removes the temp link.
 *
 * @export
 * @param {D3Node} node
 */
export function mouseUpOnNode(this: TwigletGraphComponent, node: D3Node) {
  if (this.tempLink) {
    this.tempLink.target = node.id;
    this.state.twiglet.links.addLink(this.tempLink);
    this.updateLinkLocation();
    mouseUpOnCanvas(this)();
  }
}

export function dblClickNode(this: TwigletGraphComponent, node: D3Node) {
  if (this.userState.isEditing) {
    const modelRef = this.modalService.open(EditNodeModalComponent);
    modelRef.componentInstance.id = node.id;
  } else {
    console.log('unclick?');
    node.fx = null;
    node.fy = null;
    this.state.twiglet.nodes.updateNode(node);
  }
}
