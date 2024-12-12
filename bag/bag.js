function knapsack() {
    const weights = document.getElementById('weights').value.split(',').map(Number);
    const values = document.getElementById('values').value.split(',').map(Number);
    const capacity = Number(document.getElementById('capacity').value);
    const n = weights.length;

    // 动态规划表
    const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));
    let steps = []; // 存储每一步的状态用于动态展示

    // 填充动态规划表
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
        steps.push(JSON.parse(JSON.stringify(dp))); // 深拷贝当前状态
    }

    // 动态可视化
    visualizeSteps(steps, n, capacity);
}

function visualizeSteps(steps, n, capacity) {
    const table = document.getElementById('table');
    table.innerHTML = ''; // 清空表格

    let stepIndex = 0;

    const displayStep = () => {
        table.innerHTML = ''; // 清空表格

        // 创建索引行
        let indexRow = document.createElement('div');
        let indexCell = document.createElement('div');
        indexCell.className = 'cell';
        indexCell.style.backgroundColor = '#2e2e2e';
        indexRow.appendChild(indexCell);

        for (let w = 0; w <= capacity; w++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.backgroundColor = 'green';
            cell.innerText = w;
            indexRow.appendChild(cell);
        }
        table.appendChild(indexRow);

        for (let i = 0; i <= n; i++) {
            const row = document.createElement('div');

            // 创建索引列
            let indexCell = document.createElement('div');
            indexCell.className = 'cell';
            indexCell.style.backgroundColor = 'green';
            indexCell.innerText = i;
            row.appendChild(indexCell);

            for (let w = 0; w <= capacity; w++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.innerText = steps[stepIndex][i][w];

                // 高亮显示选择的物品
                if (i > 0 && steps[stepIndex][i][w] !== steps[stepIndex][i - 1][w]) {
                    cell.classList.add('selected');
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        stepIndex++;
        if (stepIndex < steps.length) {
            setTimeout(displayStep, 1000); // 每500毫秒显示下一步
        } else {
            document.getElementById('output').innerText = `最大价值: ${steps[steps.length - 1][n][capacity]}`;
        }
    };

    displayStep();
}
