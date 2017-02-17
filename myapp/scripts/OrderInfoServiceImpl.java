package com.chief.twdrp.storemgr.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chief.twdrp.cache.DiningTablesOperatorCache;
import com.chief.twdrp.config.CtrlConst;
import com.chief.twdrp.config.TableConst;
import com.chief.twdrp.exception.ServiceException;
import com.chief.twdrp.mapper.DiningTableMapper;
import com.chief.twdrp.mapper.OrderBookingInfoMapper;
import com.chief.twdrp.mapper.OrderInfoMapper;
import com.chief.twdrp.model.BusDiningTable;
import com.chief.twdrp.model.OrderBookingInfo;
import com.chief.twdrp.model.OrderInfo;
import com.chief.twdrp.storemgr.service.OrderInfoService;
import com.chief.twdrp.storemgr.utils.ObjectUtils;
import com.chief.twdrp.utils.OrderNumUtils;
import com.rabbitframework.commons.utils.UUIDUtils;
import com.rabbitframework.dbase.mapping.param.WhereParamType;

@Service("OrderInfoService")
public class OrderInfoServiceImpl implements OrderInfoService {
	private Logger logger = LoggerFactory.getLogger(OrderInfoServiceImpl.class);
	@Autowired
	private OrderInfoMapper orderInfoMapper;
	@Autowired
	private OrderBookingInfoMapper orderBookingInfoMapper;
	@Autowired
	private DiningTableMapper diningTableMapper;
	@Autowired
	private DiningTablesOperatorCache diningTablesOperatorCache;

	/**
	 * 新增订单表 新增订单的时候如果没有提供父id则父id为空，即代表该订单属于顶级订单
	 * 
	 * @param orderInfo
	 */
	@Override
	public int addOrderInfo(OrderInfo orderInfo) throws ServiceException {
		int result = 0;
		int updateResult = 0;
		try {
			// 添加订单
			orderInfo.setOrderNum(getOrderNum(orderInfo));

			result += orderInfoMapper.addOrderInfo(orderInfo);
			// 合并预订单
			OrderBookingInfo orderBookingInfo = new OrderBookingInfo();
			orderBookingInfo.setSeatId(orderInfo.getSeatId());
			orderBookingInfo.setTotalSingleId(orderInfo.getOrderInfoId());
			result += (updateResult = orderBookingInfoMapper.mergeOrderBookingInfo(orderBookingInfo));
			if (updateResult == 0) {
				throw new ServiceException("not booking infos");
			}
			// 修改餐台状态
			return result;

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new ServiceException(e.getMessage(), e);
		}
	}

	/**
	 * 生成订单编号 service中没有做验证操作，请确保调用方法的时候OrderInfo对象中OrderInfoId和SeatId不为空
	 * 翻台次数目前在数据库中没有存储。暂时没有加上去
	 * 
	 * @param orderInfo
	 * @return
	 */
	private String getOrderNum(OrderInfo orderInfo) {
		// 如果没有parentid说明这是第一次下单，则创建总单ID
		if (!ObjectUtils.isNotEmpty(orderInfo.getParentId())) {
			orderInfo.setParentId(UUIDUtils.getTimeUUID32());
		}
		// 如果没有设置订单状态，则表示是东家下单，即未审核状态。如果是服务员下单，请确保为审核状态
		if (!ObjectUtils.isNotEmpty(orderInfo.getOrderStatus())) {
			orderInfo.setOrderStatus((short) CtrlConst.ORDER_STATUS.NOT_AUDIT.getValue());
		}
		// 设置订单主键
		orderInfo.setOrderInfoId(UUIDUtils.getTimeUUID32());
		// 加入当前时间
		orderInfo.setCreationTime(new Date());
		String count = "0";
		if (ObjectUtils.isNotEmpty(orderInfo.getSeatId())) {
			count = diningTablesOperatorCache.getOpenTableCount(orderInfo.getSeatId().toString());
		}
		String orderNum = OrderNumUtils.generate(orderInfo.getStoreId() + "", orderInfo.getSeatId() + "", count);
		return orderNum;
	}

	/**
	 * 更新订单表
	 *
	 * @param orderInfo
	 */
	@Override
	public int updateOrderInfo(OrderInfo orderInfo) throws ServiceException {
		try {
			return orderInfoMapper.updateOrderInfo(orderInfo);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new ServiceException(e.getMessage(), e);
		}
	}

	/**
	 * 查询订单表
	 *
	 * @param orderInfoId
	 */
	@Override
	public OrderInfo getOrderInfo(String orderInfoId) throws ServiceException {
		try {
			return orderInfoMapper.getOrderInfo(orderInfoId);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new ServiceException(e.getMessage(), e);
		}
	}

	/**
	 * 删除订单表
	 *
	 * @param orderInfoId
	 */
	@Override
	public int deleteOrderInfo(String orderInfoId) throws ServiceException {
		try {
			return orderInfoMapper.deleteOrderInfo(orderInfoId);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new ServiceException(e.getMessage(), e);
		}
	}

	/**
	 * 批量查询订单表
	 *
	 * @param seatId
	 */
	@Override
	public List<OrderInfo> findAllOrderInfo(int seatId) throws ServiceException {
		try {
			return orderInfoMapper.findAllOrderInfo(seatId);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new ServiceException(e.getMessage(), e);
		}

	}

	/**
	 * 批量查询没有完成的子订单
	 */
	@Override
	public OrderInfo getParentInfo(Integer seatId) throws ServiceException {
		try {
			List<OrderInfo> parentInfos = orderInfoMapper.getParentInfo(seatId);
			OrderInfo result = spawnOrderInfo(parentInfos);
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new ServiceException(e.getMessage(), e);
		}

	}

	/**
	 * 根据订单信息封装总单信息,包括总单号和人数
	 * 
	 * @param parentInfos
	 * @param result
	 * @return
	 */
	private OrderInfo spawnOrderInfo(List<OrderInfo> parentInfos) {
		if (!ObjectUtils.isNotEmpty(parentInfos)) {
			return null;
		}
		String parentid = parentInfos.get(0).getParentId();
		int numDiners = 0;
		OrderInfo result = new OrderInfo();
		for (OrderInfo orderInfo : parentInfos) {
			numDiners += orderInfo.getNumDiners();// 人数累加
		}
		result.setNumDiners(numDiners);
		result.setParentId(parentid);
		return result;

	}

	/**
	 * 获取所有未支付的订单
	 */
	@Override
	public List<OrderInfo> findNotPlayOrderInfo(String parentId) throws ServiceException {
		try {
			List<OrderInfo> parentInfos = orderInfoMapper.findNotPlayOrderInfo(parentId);
			return parentInfos;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new ServiceException(e.getMessage(), e);
		}

	}

	/**
	 * TODO 更新支付订单号
	 */
	@Override
	public int updateOrderPaymentId(List<OrderInfo> notPlays, String orderPaymentId) throws ServiceException {

		try {
			Map<String, Object> maps = new HashMap<String, Object>();
			maps.put("params", notPlays);
			maps.put("orderPaymentId", orderPaymentId);

			return orderInfoMapper.updatePaymentId(maps);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new ServiceException(e.getMessage(), e);
		}

	}

	/**
	 * 根据支付订单号修改订单状态
	 */
	@Override
	public int updateOrderStatus(String orderPaymentId, TableConst.OrderInfoOrderStatus status,
			TableConst.PaymentChannel paymentChannel) throws ServiceException {

		int result;
		try {
			result = orderInfoMapper.updateOrderStatus(orderPaymentId, (short) paymentChannel.getValue(),
					(short) status.getValue());
			// 将餐台信息改成已付
			BusDiningTable busDiningTable = new BusDiningTable();
			List<OrderInfo> list = orderInfoMapper.getPaymentInfo(orderPaymentId);
			if (!ObjectUtils.isNotEmpty(list)) {
				return 0;
			}
			Integer seatId = list.get(0).getSeatId();
			busDiningTable.setSeatId(seatId);
			busDiningTable.setState(TableConst.DiningTableState.PAID.getValue());
			diningTableMapper.updateDiningTable(busDiningTable);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new ServiceException(e.getMessage(), e);
		}
		return result;
	}

	/**
	 * 根据总单ID修改用餐人数
	 * 
	 */
	@Override
	public int updateNumDiners(OrderInfo orderInfo) throws ServiceException {
		try {
			// 查询最后一条订单信息
			OrderInfo lastOrder = orderInfoMapper.getLastOrderInfo(orderInfo.getParentId());
			if (!ObjectUtils.isNotEmpty(lastOrder)) {
				throw new ServiceException("没有总单信息");
			}
			int num = orderInfoMapper.findParentNumDiners(orderInfo.getParentId());
			lastOrder.setNumDiners(orderInfo.getNumDiners() + lastOrder.getNumDiners() - num);
			int result = orderInfoMapper.updateNumDiners(lastOrder);
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new ServiceException(e.getMessage(), e);
		}

	}

	/**
	 * 撤单 目前只是简简单单的将订单状态改成已撤单
	 */
	@Override
	public int cancellationsOrder(String parentId) {
		try {
			int result = orderInfoMapper.cancellationsOrder(parentId,
					(short) TableConst.OrderInfoOrderStatus.WITHDRAW.getValue());
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new ServiceException(e.getMessage(), e);
		}

	}
	
	/**
	 * 根据链接条件查询订单列表
	 *
	 * @param orderInfoId
	 */
	@Override
	public List<OrderInfo> getOrderListByWhereParamType(WhereParamType example) throws ServiceException {
		try {
			return orderInfoMapper.selectByExample(example);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new ServiceException(e.getMessage(), e);
		}
	}

	@Override
	public List<OrderInfo> findOrderListByParentId(String parentId) throws ServiceException {
		try {
			return orderInfoMapper.findOrderListByParentId(parentId);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new ServiceException(e.getMessage(), e);
		}
	}

}