import { Image, View } from "@tarojs/components";
import { Row, Col, CellGroup, Cell } from "@nutui/nutui-react-taro";
import Taro, { useDidShow } from "@tarojs/taro";
import { kanbanData } from "./api";
import type { IKanBanData } from "./api";
import { FC, useState } from "react";
import styles from "./index.module.scss";

export interface IHomeProps {}

export interface ICardItem {
  label: string;
  value: number;
  color: string;
}

const Home: FC<IHomeProps> = ({}) => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<IKanBanData>({});
  useDidShow(() => {
    fetchData();
  });
  const fetchData = async () => {
    setLoading(true);
    Taro.showLoading({
      title: "加载中",
    });
    const res: any = await kanbanData();
    if (res) {
      setInfo({ ...res });
    }
    Taro.hideLoading();
    setLoading(false);
  };
  const cardSetting: ICardItem[] = [
    {
      label: "设备总数",
      value: info?.deviceCount ?? 0,
      color: "rgb(73, 69, 255)",
    },
    {
      label: "在线设备",
      value: info?.onlineDeviceCount ?? 0,
      color: "rgb(16, 185, 129)",
    },
    {
      label: "今日属性",
      value: info?.attributesDataCount ?? 0,
      color: "rgb(0, 39, 102)",
    },
    {
      label: "今日事件",
      value: info?.eventCount ?? 0,
      color: "rgb(0, 80, 179)",
    },
  ];
  return (
    <View className={styles.homeContainer}>
      {!loading && (
        <>
          <View className={styles.banner}>
            <View className={styles.logo}>
              <Image
                className={styles.icon}
                src="https://oweqian.oss-cn-hangzhou.aliyuncs.com/miniApp/logo-icon.svg"
              />
              <Image
                className={styles.text}
                src="https://oweqian.oss-cn-hangzhou.aliyuncs.com/miniApp/logo-text-light.svg"
              />
            </View>
            <Row type="flex" justify="space-between" wrap="wrap">
              {cardSetting?.map((item, index) => {
                return (
                  <Col span="11" key={index}>
                    <View className={styles.cardItem}>
                      <View
                        className={styles.line}
                        style={{ background: item.color }}
                      />
                      <View className={styles.content}>
                        <View className={styles.label}>{item.label}</View>
                        <View className={styles.value}>{item.value}</View>
                      </View>
                    </View>
                  </Col>
                );
              })}
            </Row>
          </View>
          <View className={styles.assets}>
            <View className={styles.box}>
              <CellGroup>
                <Cell
                  iconSlot={
                    <Image
                      className="nut-icon"
                      src="https://oweqian.oss-cn-hangzhou.aliyuncs.com/miniApp/things.svg"
                    />
                  }
                  title="告警设备"
                  desc={String(info?.alarmsCount) ?? '0'}
                />
                <Cell
                  iconSlot={
                    <Image
                      className="nut-icon"
                      src="https://oweqian.oss-cn-hangzhou.aliyuncs.com/miniApp/things.svg"
                    />
                  }
                  title="用户"
                  desc={String(info?.userCount) ?? '0'}
                />
                <Cell
                  iconSlot={
                    <Image
                      className="nut-icon"
                      src="https://oweqian.oss-cn-hangzhou.aliyuncs.com/miniApp/things.svg"
                    />
                  }
                  title="产品"
                  desc={String(info?.produceCount) ?? '0'}
                />
                <Cell
                  iconSlot={
                    <Image
                      className="nut-icon"
                      src="https://oweqian.oss-cn-hangzhou.aliyuncs.com/miniApp/things.svg"
                    />
                  }
                  title="规则"
                  desc={String(info?.rulesCount) ?? '0'}
                />
              </CellGroup>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Home;
