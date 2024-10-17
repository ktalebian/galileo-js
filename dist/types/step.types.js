"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolStep = exports.RetrieverStep = exports.LlmStep = exports.StepWithoutChildren = exports.WorkflowStep = exports.AgentStep = exports.StepWithChildren = exports.StepType = void 0;
var StepType;
(function (StepType) {
    StepType["llm"] = "llm";
    StepType["chat"] = "chat";
    StepType["chain"] = "chain";
    StepType["tool"] = "tool";
    StepType["agent"] = "agent";
    StepType["retriever"] = "retriever";
    StepType["workflow"] = "workflow";
})(StepType || (exports.StepType = StepType = {}));
class StepWithChildren {
    constructor(step) {
        this.steps = [];
        this.createdAtNs = step.createdAtNs ?? new Date().getTime() * 1000000;
        this.durationNs = step.durationNs ?? 0;
        this.groundTruth = step.groundTruth;
        this.input = step.input;
        this.metadata = step.metadata ?? {};
        this.name = step.name;
        this.output = step.output;
        this.parent = step.parent ?? null;
        this.statusCode = step.statusCode;
    }
    addStep(step) {
        this.steps.push(step);
        // eslint-disable-next-line no-console
        console.log(`➕ ${step.type[0].toUpperCase() + step.type.slice(1)} step added…`);
        return step;
    }
    conclude(output, durationNs, statusCode) {
        this.output = output ?? this.output;
        this.durationNs = durationNs ?? this.durationNs;
        this.statusCode = statusCode;
        return this.parent;
    }
}
exports.StepWithChildren = StepWithChildren;
class AgentStep extends StepWithChildren {
    constructor(step) {
        super(step);
        this.type = StepType.agent;
    }
}
exports.AgentStep = AgentStep;
class WorkflowStep extends StepWithChildren {
    constructor(step) {
        super(step);
        this.type = StepType.workflow;
    }
}
exports.WorkflowStep = WorkflowStep;
class StepWithoutChildren {
    constructor(step) {
        this.createdAtNs = step.createdAtNs ?? new Date().getTime() * 1000000;
        this.durationNs = step.durationNs ?? 0;
        this.groundTruth = step.groundTruth;
        this.input = step.input;
        this.metadata = step.metadata ?? {};
        this.name = step.name;
        this.output = step.output;
        this.statusCode = step.statusCode;
    }
}
exports.StepWithoutChildren = StepWithoutChildren;
class LlmStep extends StepWithoutChildren {
    constructor(step) {
        super(step);
        this.type = StepType.llm;
        this.inputTokens = step.inputTokens;
        this.model = step.model;
        this.outputTokens = step.outputTokens;
        this.temperature = step.temperature;
        this.totalTokens = step.totalTokens;
    }
}
exports.LlmStep = LlmStep;
class RetrieverStep extends StepWithoutChildren {
    constructor(step) {
        super(step);
        this.type = StepType.retriever;
    }
}
exports.RetrieverStep = RetrieverStep;
class ToolStep extends StepWithoutChildren {
    constructor(step) {
        super(step);
        this.type = StepType.tool;
    }
}
exports.ToolStep = ToolStep;
//# sourceMappingURL=step.types.js.map