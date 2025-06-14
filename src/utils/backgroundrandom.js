export const getRandomColor = () => {
  const colors = [
    "rgba(253, 147, 24, 0.2)", // #FD9318
    "rgba(0, 214, 150, 0.2)", // #00D696
    "rgba(31, 153, 240, 0.2)", // #1F99F0
    "rgba(255, 195, 40, 0.2)", // #FFC328
    "rgba(244, 42, 84, 0.2)", // #F42A54
    "rgba(56, 95, 234, 0.2)", // #385FEA
    "rgba(203, 108, 230, 0.2)", // #CB6CE6
    "rgba(92, 225, 230, 0.2)", // #5CE1E6
    "rgba(255, 109, 89, 0.2)", // #FF6D59
    "rgba(255, 99, 132, 0.2)", // #FF6384
    "rgba(75, 192, 192, 0.2)", // #4BC0C0
    "rgba(255, 205, 86, 0.2)", // #FFCD56
    "rgba(54, 162, 235, 0.2)", // #36A2EB
    "rgba(153, 102, 255, 0.2)", // #9966FF
    "rgba(255, 159, 64, 0.2)", // #FF9F40
    "rgba(255, 99, 71, 0.2)", // #FF6347
    "rgba(124, 252, 0, 0.2)", // #7CFC00

    "rgba(255, 215, 0, 0.2)", // #FFD700
    "rgba(218, 112, 214, 0.2)", // #DA70D6
    "rgba(240, 128, 128, 0.2)", // #F08080
    "rgba(0, 255, 127, 0.2)", // #00FF7F
    "rgba(0, 191, 255, 0.2)", // #00BFFF
    "rgba(138, 43, 226, 0.2)", // #8A2BE2
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
