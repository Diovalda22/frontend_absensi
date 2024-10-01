import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { animated, useSpring } from '@react-spring/web';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ITEMS = [
  {
    id: '1',
    label: 'Website',
    children: [
      { id: '1.1', label: 'Home', color: 'green' },
      { id: '1.2', label: 'Pricing', color: 'green' },
      { id: '1.3', label: 'About us', color: 'green' },
      {
        id: '1.4',
        label: 'Blog',
        children: [
          { id: '1.1.1', label: 'Announcements', color: 'blue' },
          { id: '1.1.2', label: 'April lookahead', color: 'blue' },
          { id: '1.1.3', label: "What's new", color: 'blue' },
          { id: '1.1.4', label: 'Meet the team', color: 'blue' },
        ],
      },
    ],
  },
  {
    id: '2',
    label: 'Store',
    children: [
      { id: '2.1', label: 'All products', color: 'green' },
      {
        id: '2.2',
        label: 'Categories',
        children: [
          { id: '2.2.1', label: 'Gadgets', color: 'blue' },
          { id: '2.2.2', label: 'Phones', color: 'blue' },
          { id: '2.2.3', label: 'Wearables', color: 'blue' },
        ],
      },
      { id: '2.3', label: 'Bestsellers', color: 'green' },
      { id: '2.4', label: 'Sales', color: 'green' },
    ],
  },
  { id: '4', label: 'Contact', color: 'blue' },
  { id: '5', label: 'Help', color: 'blue' },
];

function DotIcon({ color }) {
  return (
    <Box sx={{ marginRight: 1, display: 'flex', alignItems: 'center' }}>
      <svg width={6} height={6}>
        <circle cx={3} cy={3} r={3} fill={color} />
      </svg>
    </Box>
  );
}

DotIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
}

TransitionComponent.propTypes = {
  in: PropTypes.bool,
};

function CustomLabel({ color, children }) {
  const theme = useTheme();
  const colors = {
    blue: theme.palette.primary.main,
    green: theme.palette.success.main,
  };

  const iconColor = color ? colors[color] : null;
  return (
    <Typography
      variant="body2"
      sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
    >
      {iconColor && <DotIcon color={iconColor} />}
      {children}
    </Typography>
  );
}

CustomLabel.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['blue', 'green']),
};

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const { nodeId, label, children, color, ...other } = props;

  return (
    <TreeItem
      ref={ref}
      nodeId={nodeId}
      label={<CustomLabel color={color}>{label}</CustomLabel>}
      {...other}
    >
      {children}
    </TreeItem>
  );
});

CustomTreeItem.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['blue', 'green']),
  nodeId: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
};

export default function CustomizedTreeView() {
  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Product tree
        </Typography>
        <TreeView
          aria-label="pages"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ m: '0 -8px', pb: '8px', height: 'fit-content', flexGrow: 1, overflowY: 'auto' }}
        >
          {ITEMS.map((item) => (
            <CustomTreeItem key={item.id} nodeId={item.id} label={item.label} color={item.color}>
              {item.children &&
                item.children.map((subItem) => (
                  <CustomTreeItem
                    key={subItem.id}
                    nodeId={subItem.id}
                    label={subItem.label}
                    color={subItem.color}
                  />
                ))}
            </CustomTreeItem>
          ))}
        </TreeView>
      </CardContent>
    </Card>
  );
}
