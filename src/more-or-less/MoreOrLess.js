import React from 'react';
import cx from 'classnames';
import { pure, props, t, skinnable } from '../utils';
import { Icon } from '../Icon';


@pure
@skinnable()
@props({
  children: t.ReactNode,
  expanded: t.Boolean,
  onExpandedChange: t.Function,
  icons: t.struct({
    expanded: t.String,
    collapsed: t.String
  }),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
})
export default class MoreOrLess extends React.Component {

  toggleExpanded = () => {
    this.props.onExpandedChange(!this.props.expanded);
  }

  getLocals() {
    const {
      props: { children, className, style, expanded, icons },
      toggleExpanded
    } = this;

    const panelState = expanded ? 'more' : 'less';
    const icon = expanded ? icons.expanded : icons.collapsed;
    return {
      children,
      className,
      style,
      panelState,
      icon,
      toggleExpanded
    };
  }

  templateExpandButton = ({ icon, toggleExpanded }) => {
    return (
      <div className='expand-button' onClick={toggleExpanded}>
        <Icon icon={icon} className='expand-button-icon' />
      </div>
    );
  }

  template({ children, className, style, panelState, icon, toggleExpanded }) {
    return (
      <div className={cx('more-or-less', panelState, className)} style={style}>
        {children}
        {this.templateExpandButton({ icon, toggleExpanded })}
      </div>
    );
  }
}
