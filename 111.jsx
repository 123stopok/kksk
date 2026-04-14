import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 页面切换动画配置
const pageVariants = {
  hidden: { opacity: 0, y: 60, transition: { duration: 0.8 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1] } },
  exit: { opacity: 0, y: -60, transition: { duration: 0.6 } }
};

// 元素渐入动画
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2 } }
};

// 按钮悬停动效
const buttonHover = {
  hover: { scale: 1.03, y: -2, transition: { type: "spring", stiffness: 300 } }
};

const QuitSmokingH5 = () => {
  const [current, setCurrent] = useState(1);
  const totalPages = 12;
  const [modal, setModal] = useState({ show: false, text: "" });

  // 正确答案配置
  const correctAnswers = { 3: 3, 5: 1, 7: 2, 9: 2 };
  const answerTips = {
    3: "正确答案：焦油 → 香烟中最主要的致癌物质",
    5: "正确答案：血压心率恢复正常 → 戒烟20分钟身体就会启动修复",
    7: "正确答案：丢掉所有香烟 → 断绝源头是戒烟的第一步",
    9: "正确答案：立刻吸烟 → 烟瘾发作时要坚持忍耐，拒绝复吸"
  };

  // 下一页
  const next = () => {
    if (current >= totalPages) return;
    setCurrent(prev => prev + 1);
  };

  // 上一页
  const prev = () => {
    if (current <= 1) return;
    setCurrent(prev => prev - 1);
  };

  // 答题校验
  const checkAnswer = (page, ans) => {
    if (ans === correctAnswers[page]) {
      next();
    } else {
      setModal({ show: true, text: answerTips[page] });
    }
  };

  // 关闭弹窗
  const closeModal = () => {
    setModal({ show: false, text: "" });
    next();
  };

  // 滚轮/键盘控制
  useEffect(() => {
    const handleWheel = (e) => {
      e.deltaY > 0 ? next() : prev();
    };
    const handleKey = (e) => {
      if (e.key === "ArrowDown" || e.key === " ") next();
      if (e.key === "ArrowUp") prev();
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
    };
  }, [current]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#FCFCFC] relative">
      {/* 背景底图（固定不遮挡） */}
      <div className="fixed inset-0 w-full h-full -z-10 opacity-10 bg-[url('https://picsum.photos/1920/1080')] bg-center bg-cover" />

      {/* 错误弹窗 */}
      <AnimatePresence>
        {modal.show && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 shadow-2xl z-50 w-[90%] max-w-sm"
            >
              <h2 className="text-red-500 text-xl font-bold mb-4">回答错误 ❌</h2>
              <p className="text-gray-600 mb-6">{modal.text}</p>
              <button
                onClick={closeModal}
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-600 w-full"
              >
                查看知识点
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 页面容器 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full h-full absolute inset-0 flex flex-col items-center justify-center px-6 py-10"
        >
          {/* ========== 1. 封面页 ========== */}
          {current === 1 && (
            <motion.div className="text-center max-w-lg mx-auto" variants={fadeInUp}>
              <h1 className="text-[clamp(1.8rem,5vw,3rem)] font-bold text-gray-900 mb-4">
                为了自己与家人<br />开始戒烟吧
              </h1>
              <p className="text-gray-500 text-lg mb-8">每一次拒绝香烟，都是向健康靠近</p>
              <motion.img
                src="https://picsum.photos/id/25/600/400"
                className="rounded-2xl max-w-[80%] mx-auto mb-6 shadow-lg"
                alt="戒烟健康"
                whileHover={{ scale: 1.03 }}
              />
              <motion.div
                onClick={next}
                variants={buttonHover}
                whileHover="hover"
                className="mt-8 text-lg text-gray-700 font-medium cursor-pointer"
              >
                点击开始 ↓
              </motion.div>
            </motion.div>
          )}

          {/* ========== 2. 吸烟痛点页 ========== */}
          {current === 2 && (
            <motion.div className="text-center max-w-lg mx-auto" variants={fadeInUp}>
              <h2 className="text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-gray-900 mb-6">你是否被这些困扰？</h2>
              <div className="border-2 border-gray-200 rounded-xl p-6 text-left bg-white/90 backdrop-blur-sm shadow-sm">
                <p className="mb-4 text-gray-700">✅ 晨起咳嗽不止，喉咙干痛</p>
                <p className="mb-4 text-gray-700">✅ 身上烟味浓重，家人反感</p>
                <p className="mb-4 text-gray-700">✅ 体力下降，爬楼气喘</p>
                <p className="text-gray-700">✅ 牙齿发黄，口臭明显</p>
              </div>
              <motion.div
                onClick={next}
                variants={buttonHover}
                whileHover="hover"
                className="mt-8 text-lg text-gray-700 font-medium cursor-pointer"
              >
                继续了解 ↓
              </motion.div>
            </motion.div>
          )}

          {/* ========== 3. 答题1 ========== */}
          {current === 3 && (
            <motion.div className="text-center max-w-lg mx-auto" variants={fadeInUp}>
              <h2 className="text-[clamp(1.4rem,4vw,2rem)] font-bold text-gray-900 mb-3">答题挑战 1/4</h2>
              <p className="text-gray-600 text-lg mb-10">吸烟最主要的致癌物质是？</p>
              <div className="flex flex-col items-center gap-3">
                {["一氧化碳", "尼古丁", "焦油"].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={buttonHover}
                    whileHover="hover"
                    onClick={() => checkAnswer(3, i + 1)}
                    className="w-[280px] py-4 px-5 border-2 border-green-500 rounded-xl text-center cursor-pointer text-gray-700 font-medium"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========== 4. 知识点1 ========== */}
          {current === 4 && (
            <motion.div className="text-center max-w-lg mx-auto" variants={fadeInUp}>
              <h2 className="text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-gray-900 mb-6">香烟的隐藏危害</h2>
              <div className="border-2 border-gray-200 rounded-xl p-6 text-left bg-white/90 backdrop-blur-sm shadow-sm">
                <p className="mb-3 text-gray-700">🔥 焦油：强致癌物，损伤肺部细胞</p>
                <p className="mb-3 text-gray-700">🔥 尼古丁：高度成瘾，损伤血管</p>
                <p className="mb-3 text-gray-700">🔥 一氧化碳：降低血液含氧量</p>
                <p className="text-gray-700">🔥 二手烟/三手烟：严重危害家人健康</p>
              </div>
              <motion.div
                onClick={next}
                variants={buttonHover}
                whileHover="hover"
                className="mt-8 text-lg text-gray-700 font-medium cursor-pointer"
              >
                继续答题 ↓
              </motion.div>
            </motion.div>
          )}

          {/* ========== 5. 答题2 ========== */}
          {current === 5 && (
            <motion.div className="text-center max-w-lg mx-auto" variants={fadeInUp}>
              <h2 className="text-[clamp(1.4rem,4vw,2rem)] font-bold text-gray-900 mb-3">答题挑战 2/4</h2>
              <p className="text-gray-600 text-lg mb-10">戒烟20分钟后，身体会发生什么？</p>
              <div className="flex flex-col items-center gap-3">
                {["血压心率恢复正常", "肺部完全修复", "味觉完全恢复"].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={buttonHover}
                    whileHover="hover"
                    onClick={() => checkAnswer(5, i + 1)}
                    className="w-[280px] py-4 px-5 border-2 border-green-500 rounded-xl text-center cursor-pointer text-gray-700 font-medium"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========== 6. 知识点2 ========== */}
          {current === 6 && (
            <motion.div className="text-center max-w-lg mx-auto" variants={fadeInUp}>
              <h2 className="text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-gray-900 mb-6">戒烟后的身体变化</h2>
              <div className="border-2 border-gray-200 rounded-xl p-6 text-left bg-white/90 backdrop-blur-sm shadow-sm">
                <p className="mb-3 text-gray-700">🕐 20分钟：血压、心率恢复正常</p>
                <p className="mb-3 text-gray-700">🕑 24小时：心脏病风险降低</p>
                <p className="mb-3 text-gray-700">🕒 3个月：循环系统、肺功能改善</p>
                <p className="text-gray-700">🕓 1年：冠心病风险减半</p>
              </div>
              <motion.div
                onClick={next}
                variants={buttonHover}
                whileHover="hover"
                className="mt-8 text-lg text-gray-700 font-medium cursor-pointer"
              >
                继续答题 ↓
              </motion.div>
            </motion.div>
          )}

          {/* ========== 7. 答题3 ========== */}
          {current === 7 && (
            <motion.div className="text-center max-w-lg mx-auto" variants={fadeInUp}>
              <h2 className="text-[clamp(1.4rem,4vw,2rem)] font-bold text-gray-900 mb-3">答题挑战 3/4</h2>
              <p className="text-gray-600 text-lg mb-10">戒烟第一步最应该做什么？</p>
              <div className="flex flex-col items-center gap-3">
                {["减少吸烟量", "丢掉所有香烟", "吃零食代替"].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={buttonHover}
                    whileHover="hover"
                    onClick={() => checkAnswer(7, i + 1)}
                    className="w-[280px] py-4 px-5 border-2 border-green-500 rounded-xl text-center cursor-pointer text-gray-700 font-medium"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========== 8. 知识点3 ========== */}
          {current === 8 && (
            <motion.div className="text-center max-w-lg mx-auto" variants={fadeInUp}>
              <h2 className="text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-gray-900 mb-6">3步轻松戒烟</h2>
              <div className="border-2 border-gray-200 rounded-xl p-6 text-left bg-white/90 backdrop-blur-sm shadow-sm">
                <p className="mb-4 text-gray-700">✅ 第一步：丢弃所有香烟、打火机，断绝源头</p>
                <p className="mb-4 text-gray-700">✅ 第二步：告知亲友，寻求监督与支持</p>
                <p className="text-gray-700">✅ 第三步：设定戒烟日，坚定执行不妥协</p>
              </div>
              <motion.div
                onClick={next}
                variants={buttonHover}
                whileHover="hover"
                className="mt-8 text-lg text-gray-700 font-medium cursor-pointer"
              >
                继续答题 ↓
              </motion.div>
            </motion.div>
          )}

          {/* ========== 9. 答题4 ========== */}
          {current === 9 && (
            <motion.div className="text-center max-w-lg mx-auto" variants={fadeInUp}>
              <h2 className="text-[clamp(1.4rem,4vw,2rem)] font-bold text-gray-900 mb-3">答题挑战 4/4</h2>
              <p className="text-gray-600 text-lg mb-10">烟瘾发作时，错误的做法是？</p>
              <div className="flex flex-col items-center gap-3">
                {["喝水深呼吸", "立刻吸烟", "运动分散注意力"].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={buttonHover}
                    whileHover="hover"
                    onClick={() => checkAnswer(9, i + 1)}
                    className="w-[280px] py-4 px-5 border-2 border-green-500 rounded-xl text-center cursor-pointer text-gray-700 font-medium"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========== 10. 知识点4 ========== */}
          {current === 10 && (
            <motion.div className="text-center max-w-lg mx-auto" variants={fadeInUp}>
              <h2 className="text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-gray-900 mb-6">戒断反应应对技巧</h2>
              <div className="border-2 border-gray-200 rounded-xl p-6 text-left bg-white/90 backdrop-blur-sm shadow-sm">
                <p className="mb-3 text-gray-700">💧 烟瘾发作：喝水、深呼吸，坚持5分钟</p>
                <p className="mb-3 text-gray-700">🍎 嘴馋饥饿：低热量零食、水果代替</p>
                <p className="mb-3 text-gray-700">🏃 烦躁焦虑：散步、拉伸、运动缓解</p>
                <p className="text-gray-700">🧠 坚定信念：想想健康与家人，绝不复吸</p>
              </div>
              <motion.div
                onClick={next}
                variants={buttonHover}
                whileHover="hover"
                className="mt-8 text-lg text-gray-700 font-medium cursor-pointer"
              >
                最后一步 ↓
              </motion.div>
            </motion.div>
          )}

          {/* ========== 11. 成功激励页 ========== */}
          {current === 11 && (
            <motion.div className="text-center max-w-lg mx-auto" variants={fadeInUp}>
              <h2 className="text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-gray-900 mb-6">他们都成功了，你也可以</h2>
              <div className="border-2 border-gray-200 rounded-xl p-6 bg-white/90 backdrop-blur-sm shadow-sm">
                <img
                  src="https://picsum.photos/id/1058/600/400"
                  className="rounded-xl w-full mb-4"
                  alt="成功案例"
                />
                <p className="text-gray-600">坚持21天，戒烟就能成为习惯！</p>
              </div>
              <motion.div
                onClick={next}
                variants={buttonHover}
                whileHover="hover"
                className="mt-8 text-lg text-gray-700 font-medium cursor-pointer"
              >
                许下承诺 ↓
              </motion.div>
            </motion.div>
          )}

          {/* ========== 12. 承诺页 ========== */}
          {current === 12 && (
            <motion.div
              className="text-center max-w-lg mx-auto text-white"
              variants={fadeInUp}
            >
              <h2 className="text-[clamp(1.8rem,5vw,2.8rem)] font-bold mb-8">
                今天，就是戒烟的第一天
              </h2>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                animate={{ pulse: { scale: [1, 1.05, 1] }, transition: { repeat: Infinity, duration: 1.5 } }}
                className="bg-white text-green-600 px-12 py-5 rounded-full text-xl font-bold shadow-lg"
              >
                我承诺戒烟 🚭
              </motion.button>
              <p className="mt-8 text-lg text-white/90">为健康，为家人，加油！</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuitSmokingH5;