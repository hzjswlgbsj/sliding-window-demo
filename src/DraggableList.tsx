import React, { useState } from "react";
import { DraggableCore, DraggableData, DraggableEvent } from "react-draggable";
import { VariableSizeList } from "react-window";
import Draggable from "react-draggable"; // 导入 react-draggable
import styles from "./draggable-list.module.less";

const DraggableList: React.FC = () => {
  const [height, setHeight] = useState<number>(200); // 初始化列表高度
  const [collapsed, setCollapsed] = useState<boolean>(false); // 初始状态为未折叠

  const handleDrag = (event: DraggableEvent, data: DraggableData) => {
    event.preventDefault(); // 阻止默认行为，防止列表滚动
    setHeight(data.y - 66); // 根据拖拽位置更新列表高度
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed); // 切换折叠状态
  };

  // 渲染列表项
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <div
      style={{
        padding: "0 12px",
        boxSizing: "border-box",
        ...style,
      }}
    >
      List Item {index + 1}
    </div>
  );

  return (
    <Draggable handle="#draggable_container" cancel="#resize_drag">
      <div className={styles.draggable_container} id="draggable_container">
        <div className={styles.toolbar}>
          <div className={styles.icon}>I</div>
          <button onClick={toggleCollapse}>
            {collapsed ? "Expand" : "Collapse"}
          </button>
        </div>
        {!collapsed && (
          <>
            <VariableSizeList
              height={height}
              itemCount={1000}
              itemSize={() => 50}
              width={300}
            >
              {Row}
            </VariableSizeList>
            <DraggableCore onDrag={handleDrag}>
              <div id="resize_drag" className={styles.handle}>
                Drag Handle
              </div>
            </DraggableCore>
          </>
        )}
      </div>
    </Draggable>
  );
};

export default DraggableList;
